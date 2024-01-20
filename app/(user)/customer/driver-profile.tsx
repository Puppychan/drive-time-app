import { useRouter, useLocalSearchParams } from 'expo-router'
import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import { ResponseCode } from '@/common/response-code.enum'
import { Colors } from '@/components/Colors'
import { AVATAR_REF } from '@/components/Constant'
import { AccountType } from '@/lib/common/model-type'
import { addUser } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import { uploadImage } from '@/lib/firebase/storage'
import { Account, AccountRole } from '@/lib/models/account.model'
import { CustomButton } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { AppDropDown } from '@/src/components/menu/DropDownMenu'

const genderList = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
  { label: 'Other', value: 'Other' }
]

export default async function Page() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { id } = params
  const [authUser, setAuthUser] = useState<User>()
  const [gender, setGender] = useState(genderList[0].value)
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob] = useState<Date>()
  const [avatarUri, setAvatarUri] = useState<any>()
  const [avatarUrl, setAvatarUrl] = useState<string>()

  useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      ToastAndroid.show('Unauthorized. Please try again', ToastAndroid.SHORT)
      router.back()
      return
    }

    if (user && id !== user.uid) {
      ToastAndroid.show('Unauthorized. Please try login', ToastAndroid.SHORT)
      router.push('/login')
      return
    }

    setAuthUser(user)
  })

  const handleSubmit = async () => {
    if (authUser) {
      if (!checkRequire) return

      if (avatarUri) {
        const res = await uploadImage(avatarUri, `${AVATAR_REF}/${authUser?.uid}.jpg`)
        if (res.code === ResponseCode.OK) {
          const { downloadUrl } = res.body
          setAvatarUrl(downloadUrl)
        }
      }

      const account: Account = {
        userId: authUser.uid,
        email: authUser.email || '',
        username,
        firstName,
        lastName,
        role: AccountRole.Driver,
        phone,
        avatar: avatarUrl,
        birthday: dob && Timestamp.fromDate(dob),
        createdDate: Timestamp.fromDate(new Date())
      }

      const driverAccount: AccountType = {
        ...account,
        workStartDate: Timestamp.fromDate(new Date()),
        // QRCode: '',
        isBan: false,
        banTime: null
      }

      addUser(authUser, driverAccount)
        .then((res) => {
          if (res.code === ResponseCode.OK) {
            ToastAndroid.show(`Add user successfully. Please login`, ToastAndroid.SHORT)
            auth.signOut()
            // router.push(/login);
          } else {
            auth.signOut()
            ToastAndroid.show(`Register account failed: ${res.message}`, ToastAndroid.SHORT)
          }
        })
        .catch((error) => {
          ToastAndroid.show(`Register account failed: ${error.message}`, ToastAndroid.SHORT)
        })
    }
  }

  const checkRequire = () => {
    let field = null
    if (username.trim() === '') {
      field = 'Username'
    } else if (firstName.trim() === '') {
      field = 'First Name'
    } else if (lastName.trim() === '') {
      field = 'Last Name'
    } else if (phone.trim() === '') {
      field = 'Phone'
    }
    if (field) {
      ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT)
      return false
    }
    return true
  }

  const chooseImage = () => {}

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Driver Profile</Text>
      <View style={styles.form}>
        <View style={styles.inline}>
          <Input
            label="First Name"
            placeHolder="First Name"
            required={true}
            onChangeText={setFirstName}
          />
          <Input
            label="Last Name"
            placeHolder="Last Name"
            required={true}
            onChangeText={setLastName}
          />
        </View>
        <Input label="Username" placeHolder="Username" required={true} onChangeText={setUsername} />
        <Input label="Phone" placeHolder="Phone Number" required={true} onChangeText={setPhone} />
        <AppDropDown
          label="Gender"
          options={genderList}
          selectedValue={gender}
          setSelectedValue={setGender}
        />
        <CustomButton title="Select Avatar" onPress={chooseImage} />
        <CustomButton title="Submit" onPress={handleSubmit} />
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
    display: 'flex',
    gap: 10
  }
})
