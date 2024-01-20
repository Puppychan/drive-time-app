import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Link, router, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'

import { ResponseCode } from '@/common/response-code.enum'
import { signIn } from '@/lib/firebase/auth'
import { Input } from '@/src/components/input/TextInput'

import { Colors, specialColors } from '../../components/Colors'
import FontSize from '../../components/FontSize'
import Spacing from '../../components/Spacing'
import CheckBox from '@/src/components/input/Checkbox'
import { AccountRole } from '@/lib/models/account.model'
import { ButtonType, CustomButton } from '@/src/components/button/Buttons'


export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [loginDisable, setLoginDisable] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const handleRegister = () => router.push('/signup')
  const handleRegisterDriver = () => router.push({pathname: '/signup', params: {role: AccountRole.Driver}})

  const handleLogin = async () => {
    setLoginDisable(true)
    if (email.trim() === '') {
      ToastAndroid.show('Email is required', ToastAndroid.SHORT)
      setLoginDisable(false)
      return
    } else if (password.trim() === '') {
      ToastAndroid.show('Password is required', ToastAndroid.SHORT)
      setLoginDisable(false)
      return
    }

    
    signIn(email, password, rememberMe)
    .then((res) => {
      if (res.code === ResponseCode.OK) {
        const user = res.body
        console.log(user)
        ToastAndroid.show(`Login successfully`, ToastAndroid.SHORT)
        router.push(`/(user)/customer/home`)
      } else {
        ToastAndroid.show(`Login failed: ${res.message}`, ToastAndroid.SHORT)
      }
    })

    setLoginDisable(false)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Login
        </Text>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'stretch',
            gap: Spacing,
          }}
        >
          
          <Input
            placeHolder="Email"
            required={true}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeHolder="Password"
            secureTextEntry={true}
            required={true}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            title="Remember me"
            isChecked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <CustomButton
            title='Forgot Password ?'
            onPress={() => {}}
            type={ButtonType.text}
            style={{alignSelf: 'flex-end'}}
            textStyle={styles.specialTextStyle}
          />
          <CustomButton 
            style={styles.buttonStyle} 
            title="Login" 
            onPress={handleLogin} 
            disabled={loginDisable} 
          />
          <CustomButton 
            style={[styles.buttonStyle, styles.registerButton]} 
            title="Create new account" 
            onPress={handleRegister}
          />
          <CustomButton 
            style={[styles.buttonStyle, styles.driverRegisterButton]} 
            type={ButtonType.outlined}
            title="Join our team? REGISTER DRIVER ACCOUNT!" 
            onPress={handleRegisterDriver}
          />
        </View>

        <View style={styles.alternativeLoginContainer}>
          <Text style={styles.specialTextStyle}>
            Or continue with
          </Text>
          <View style={styles.alternativeLogin}>
            <TouchableOpacity style={styles.alternativeLoginButton}>
              <Ionicons name="logo-google" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.alternativeLoginButton}>
              <Ionicons name="logo-apple" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.alternativeLoginButton}>
              <Ionicons name="logo-facebook" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing * 4,
    flexDirection: 'column',
    gap: Spacing * 3
  },
  buttonStyle: {
    paddingVertical: Spacing * 1.3
  },
  registerButton: {
    backgroundColor: Colors.secondaryColor,
  },
  driverRegisterButton: {
    paddingVertical: Spacing * 1.1
  },
  specialTextStyle: {
    color: specialColors.primary,
    fontSize: FontSize.small
  },
  alternativeLoginButton: {
    padding: Spacing,
    backgroundColor: specialColors.gray,
    borderRadius: 3,
  },
  alternativeLogin: {
    flexDirection: 'row',
    gap: Spacing * 2,
  },
  alternativeLoginContainer: {
    alignItems: 'center',
    gap: Spacing,
  }
})
