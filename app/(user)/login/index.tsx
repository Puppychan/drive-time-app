import { CustomButton } from '@/src/components/button/Buttons'
import { Colors } from '@/components/Colors'
import { Input } from '@/src/components/input/TextInput'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import  {createAuthAccount, signIn} from "@/lib/firebase/auth";
import { ResponseCode } from '@/common/response-code.enum'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [btnDisable, setBtnDisable] = useState<boolean>(false)

  const handleLogin = async () => {
    setBtnDisable(true)
    if (email.trim() === '') {
      ToastAndroid.show("Email is required", ToastAndroid.SHORT);
      setBtnDisable(false)
      return
    } else if (password.trim() === '') {
      ToastAndroid.show("Password is required", ToastAndroid.SHORT);
      setBtnDisable(false)
      return
    }

    signIn(email, password)
    .then((res) => {
      if (res.code === ResponseCode.OK) {
        const user = res.body
        console.log(user)
        ToastAndroid.show(`Login successfully`, ToastAndroid.SHORT);
        router.push(`/`);
      }
      else {
        ToastAndroid.show(`Login failed: ${res.message}`, ToastAndroid.SHORT);
      }
    })

    setBtnDisable(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login</Text>
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
          <CustomButton title="Login" onPress={handleLogin} disabled={btnDisable} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy_black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
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
