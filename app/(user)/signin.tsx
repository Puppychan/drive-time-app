import { ResponseCode } from '@/common/response-code.enum'
import { Colors } from '@/components/Colors'
import { signIn } from '@/lib/firebase/auth'
import { CustomButton } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
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
    <ImageBackground source={require('../../assets/saigon.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.titleText}>Login</Text>
          <Input
            placeHolder="Email"
            required={true}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Input
            placeHolder="Password"
            secureTextEntry={true}
            required={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <CustomButton style={styles.loginButton} title="Login" onPress={handleLogin} disabled={btnDisable} />
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <CustomButton style={styles.registerButton} title="Don't have an account? Register now!" onPress={handleLogin} disabled={btnDisable} />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // paddingBottom: 250,
    paddingHorizontal: 30,
    flexDirection: 'column'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  forgotPasswordButton: {
    alignSelf: 'center'
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  form: {
    flexDirection: 'column',
    gap: 15,
    width: '100%',
  },
  registerButton: {
    backgroundColor: Colors.yellow,
    padding: 10,
    borderRadius: 8,
    marginTop: 50
  },
})

// export { SignInScreen }
