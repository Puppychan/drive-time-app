import { useRouter, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import { Colors } from '@/components/Colors'
import { CustomButton, OutlineButton } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { AppDropDown } from '@/src/components/menu/DropDownMenu'
import { auth } from '@/lib/firebase/firebase'
import { deleteUser, User } from 'firebase/auth'
import { addUser } from '@/lib/firebase/auth'
import { Account, AccountRole } from '@/lib/models/account.model'
import { uploadImage } from '@/lib/firebase/storage'
import { Timestamp } from 'firebase/firestore'
import { AVATAR_REF } from '@/components/Constant'
import { ResponseCode } from '@/common/response-code.enum'
import { AccountType } from '@/lib/common/model-type'
import { ScrollView } from 'react-native-gesture-handler'

const genderList = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
  { label: 'Other', value: 'Other' }
]

export default function Page() {
  const router = useRouter()
  const [authUser, setAuthUser] = useState<User>()
  const [gender, setGender] = useState(genderList[0].value)
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob, setDob] = useState<Date>()
  const [avatarUri, setAvatarUri] = useState<any>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  useEffect(() => {
    let user = auth.currentUser || undefined;
    setAuthUser(user)
  })

  const handleSubmit = async () => {
    if (!authUser) {
      ToastAndroid.show(`Unauthorized`, ToastAndroid.SHORT);
      return
    }

    // check if all required input fields are filled
    if (!checkRequire()) return;

    // upload avatar photo (if any) to storage and get the downloadurl from it
    if (avatarUri) {
      const res = await uploadImage(avatarUri, `${AVATAR_REF}/${authUser?.uid}.jpg`);
      if (res.code === ResponseCode.OK) {
        const {downloadUrl} = res.body
        setAvatarUrl(downloadUrl)
      }
    }

    // create account
    const account: Account = {
      userId: authUser.uid,
      email: authUser.email || "",
      username: username,
      firstName: firstName,
      lastName: lastName,
      role: AccountRole.Driver,
      phone: phone,
      avatar: avatarUrl,
      birthday: dob && Timestamp.fromDate(dob),
      createdDate: Timestamp.fromDate(new Date())
    }

    const driverAccount: AccountType = {
      ...account,
      workStartDate: Timestamp.fromDate(new Date()),
      QRCode: '',
      isBan: false,
      banTime: undefined
    }

    addUser(authUser, driverAccount)
    .then((res) => {
      if (res.code === ResponseCode.OK) {
        ToastAndroid.show(`Add user successfully. Please login`, ToastAndroid.SHORT);
        auth.signOut();
        router.push(`/login`);
      }
      else {
        auth.signOut();
        ToastAndroid.show(`Register account failed: ${res.message}. Please try again`, ToastAndroid.LONG);
        router.push(`/driver/register`);
      }
    })

    return
  }

  const handleCancel = async () => {
    if (!authUser) {
      router.push(`/driver/register`);
      return
    }

    auth.signOut();
    deleteUser(authUser)
    ToastAndroid.show(`Register has been cancelled`, ToastAndroid.SHORT);
    router.push(`/driver/register`);
  }
  
  const checkRequire = () => {
    let field = null;
    if (firstName.trim() === '') {
      field = "First Name";
    } else if (lastName.trim() === '') {
      field = "Last Name";
    }
    else if (username.trim() === '') {
      field = "Username";
    }  else if (phone.trim() === '') {
      field = "Phone";
    }

    if (field) ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
    return field ? false : true;
  }

  const chooseImage = () => {}
  
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Driver Profile</Text>
      <View style={styles.form}>
        <View style={styles.inline}>
          <Input style={styles.elementSameRow} label="First Name" placeHolder="First Name" required={true} onChangeText={setFirstName}/>
          <Input style={styles.elementSameRow} label="Last Name" placeHolder="Last Name" required={true} onChangeText={setLastName} />
        </View>
        <Input label="Username" placeHolder="Username" required={true} onChangeText={setUsername}/>
        <Input label="Phone" placeHolder="Phone Number" required={true} onChangeText={setPhone}/>
        <Input label="Date of Birth" placeHolder="Date of Birth" onChangeText={setDob}/>
        <AppDropDown
          label="Gender"
          options={genderList}
          selectedValue={gender}
          setSelectedValue={setGender}
        />
        <OutlineButton title='Select Avatar' onPress={chooseImage}/>
        <CustomButton title="Submit" onPress={handleSubmit} />
        <CustomButton title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    backgroundColor: Colors.cream,
    width: '100%',
    maxWidth: 400,
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.navy_black
  },
  form: {
    flexDirection: 'column',
    gap: 15,
    width: '100%'
  },
  inline: {
    flexDirection: 'row',
    gap: 10
  },
  elementSameRow: {
    flex: 1
  }
})
