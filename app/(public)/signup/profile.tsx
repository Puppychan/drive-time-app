import { useRouter, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import { Colors } from '@/components/Colors'
import { CustomButton, ButtonType } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { AppDropDown } from '@/src/components/menu/DropDownMenu'
import { auth } from '@/lib/firebase/firebase'
import { deleteUser, User } from 'firebase/auth'
import { addUser, signOut } from '@/lib/firebase/auth'
import { Account, AccountRole, genderList } from '@/lib/models/account.model'
import { uploadImage } from '@/lib/firebase/storage'
import { Timestamp } from 'firebase/firestore'
import { AVATAR_REF } from '@/components/Constant'
import { ResponseCode } from '@/common/response-code.enum'
import { AccountType } from '@/lib/common/model-type'
import FontSize from '@/components/FontSize'
// const genderList = [
//   { label: 'Female', value: 'Female' },
//   { label: 'Male', value: 'Male' },
//   { label: 'Other', value: 'Other' }
// ]

export default function Page() {
  const { uid, role } = useLocalSearchParams<{ uid: string; role?: string }>();
  const accountRole = role ?? AccountRole.Customer
  const router = useRouter()
  const [authUser, setAuthUser] = useState<User>()
  const [gender, setGender] = useState(genderList[0].value)
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob, setDob] = useState<string>('')

  useEffect(() => {
    let user = auth.currentUser || undefined;
    setAuthUser(user)
  })

  const handleSubmit = async () => {
    try {
      if (!authUser) {
        ToastAndroid.show(`Unauthorized`, ToastAndroid.SHORT);
        return
      }

      // check if all required input fields are filled
      if (!checkRequire()) return;

      // create account
      const account: Account = {
        userId: authUser.uid,
        email: authUser.email ?? "",
        username: username,
        firstName: firstName,
        lastName: lastName,
        role: accountRole,
        phone: phone,
        avatar: null,
        birthday: (dob && Timestamp.fromDate(new Date(dob))) || null,
        createdDate: Timestamp.fromDate(new Date()),
        gender: gender
      }

      let roleAccount : AccountType
      switch (accountRole) {
        case AccountRole.Driver: //driver
          roleAccount = {
            ...account,
            workStartDate: Timestamp.fromDate(new Date()),
            isBan: false,
            banTime: null,
            transport: null
          }
          break;

        case AccountRole.Admin: //admin
          roleAccount = {
            ...account,
            workStartDate: Timestamp.fromDate(new Date())
          }
          break;

        default: //customer
          roleAccount = {
            ...account,
            membershipId: '1',
            membershipPoints: 0,
            description: ''
          }
      }

      const res = await addUser(authUser, roleAccount)
      if (res.code === ResponseCode.OK) {
        ToastAndroid.show(`Register account successfully. Please login`, ToastAndroid.SHORT);
        await signOut()
        router.push(`/signin`);
      }
    }
    catch (error: any) {
      console.log("~~~~ profile.tsx handleSubmit() line 121:", error)
      let message = error.message ?? "Please try again"
      ToastAndroid.show(`Create user profile failed. ${message}`, ToastAndroid.LONG);
      // router.push(`/signup`);
    }

  }

  const handleCancel = async () => {
    if (authUser) {
      auth.signOut();
      deleteUser(authUser)
    }
    ToastAndroid.show(`Register has been cancelled`, ToastAndroid.SHORT);
    router.push(`/signin`);
  }

  const checkRequire = () => {
    let field = null;
    if (firstName.trim() === '') {
      field = "First Name";
    } else if (lastName.trim() === '') {
      field = "Last Name";
    } else if (username.trim() === '') {
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
      <Text style={styles.formTitle}>Profile Information</Text>
      <View style={styles.form}>
        <View style={styles.inline}>
          <View style={styles.elementSameRow}>
            <Input label="First Name" placeHolder="First Name" required={true} onChangeText={setFirstName}/>
          </View>
          <View style={styles.elementSameRow}>
            <Input label="Last Name" placeHolder="Last Name" required={true} onChangeText={setLastName} />
          </View>
        </View>
        <Input label="Username" placeHolder="Username" required={true} onChangeText={setUsername}/>
        <Input label="Phone" placeHolder="Phone Number" required={true} onChangeText={setPhone}/>
        <Input label="Date of Birth" placeHolder="yyyy-MM-dd" onChangeText={setDob}/>
        <AppDropDown
          label="Gender"
          options={genderList}
          selectedValue={gender}
          setSelectedValue={setGender}
        />
        {/* <CustomButton title='Select Avatar' onPress={chooseImage} type={ButtonType.outlined}/> */}
        <CustomButton title="Submit" onPress={handleSubmit} />
        <CustomButton title="Cancel" onPress={handleCancel} type={ButtonType.outlined} />
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    backgroundColor: Colors.white,
    width: '100%',
    maxWidth: 400,
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 100
  },
  formTitle: {
    fontSize: FontSize.xLarge,
    fontWeight: 'bold'
  },
  form: {
    flexDirection: 'column',
    gap: 15,
    width: '100%'
  },
  inline: {
    flexDirection: 'row',
    gap: 10,
  },
  elementSameRow: {
    flex: 1,
  }
})