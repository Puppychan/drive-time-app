import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import { ResponseCode } from '@/common/response-code.enum'
import { Colors } from '@/components/Colors'
import { createAuthAccount } from '@/lib/firebase/auth'
import { ButtonType, CustomButton } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { AccountRole } from '@/lib/models/account.model'
import { auth } from '@/lib/firebase/firebase'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [btnDisable, setBtnDisable] = useState<boolean>(false)
  const {role} = useLocalSearchParams<{ role?: string }>();
  const handleCancel = async () => {
    router.push(`/signin`);
    return
  }

  const handleNext = async () => {
    setBtnDisable(true)
    if (email.trim() === '') {
      ToastAndroid.show('Email is required', ToastAndroid.SHORT)
      setBtnDisable(false)
      return
    } else if (password.trim() === '') {
      ToastAndroid.show('Password is required', ToastAndroid.SHORT)
      setBtnDisable(false)
      return
    }

    createAuthAccount(email, password)
    .then((res) => {
      if (res.code === ResponseCode.OK) {
        const user  = res.body
        console.log('User: ', user)
        router.push({pathname: `/signup/profile`, params: {uid: user.uid, role: role ?? AccountRole.Driver}});
      } else {
        console.log("~~~~~~ handleNext() line 44:", res.message)
        ToastAndroid.show(`Register failed. Please try again`, ToastAndroid.SHORT)
      }
    })

    setBtnDisable(false)
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Register {role !== AccountRole.Customer ?  role : ""}</Text>
      <View style={styles.form}>
        <Input
          label="Email"
          placeHolder="Email"
          required={true}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeHolder="Password"
          secureTextEntry={true}
          required={true}
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Continue" onPress={handleNext} disabled={btnDisable} />
        <CustomButton type={ButtonType.outlined} title="Already have an account? LOGIN" onPress={handleCancel} />

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
  }
})
