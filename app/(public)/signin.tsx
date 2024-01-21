import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native'

import { ResponseCode } from '@/common/response-code.enum'
import { signIn, signOut } from '@/lib/firebase/auth'
import { Input } from '@/src/components/input/TextInput'
import CheckBox from '@/src/components/input/Checkbox'

import { Colors, specialColors } from '../../components/Colors'
import FontSize from '../../components/FontSize'
import Spacing from '../../components/Spacing'
import { AccountRole } from '@/lib/models/account.model'
import { ButtonType, CustomButton } from '@/src/components/button/Buttons'
import BottomSheet from '@/src/components/modal/bottom-sheet'
import { TextInput } from 'react-native-paper'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = () => router.push('/signup')
  const handleRegisterDriver = () => router.push({pathname: '/signup', params: {role: AccountRole.Driver}})

  const handleLogin = async () => {
    if (email.trim() === '') {
      ToastAndroid.show('Email is required', ToastAndroid.SHORT)
      return
    } else if (password.trim() === '') {
      ToastAndroid.show('Password is required', ToastAndroid.SHORT)
      return
    }
    
    try {
      const signInRes = await signIn(email, password, rememberMe);
      if (signInRes.code === ResponseCode.OK) {
        const {user} = signInRes.body
        ToastAndroid.show(`Login successfully`, ToastAndroid.SHORT)
        router.push(`/${user.role.toLowerCase( )}/home`)
      } 
      else throw new Error(`Login failed: ${signInRes.message}`)
    }
    catch (error: any) {
      console.log(error)
      await signOut();
      let message = error.message ?? 'Please try again'
      ToastAndroid.show(`Login failed. ${message}`, ToastAndroid.SHORT)
    }
  }

  const handleHelpPress = () => {
    Alert.alert(
      'Technical Support',
      'For further information, please contact huuquoc7603@gmail.com'
    )
  }

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

  const handleBottomSheetSubmit = (email: string) => {
    // Do something with the email state, e.g., send it to the server
    console.log('Submitted email:', email)

    // Close the BottomSheet
    setBottomSheetVisible(false)
  }

  return (
    <SafeAreaView>
      {/* <View style={styles.container}>
        <Text style={styles.loginTitle}>Login</Text>

        <View  style={styles.group}>
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
        </View>

        <View style={styles.group}>
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
          
        <View style={[styles.group, styles.alternativeLoginContainer]}>
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
      </View> */}
      
      <View style={styles.container}>
        <View>
          {/* <Image
            style={{ width: 100, height: 100, resizeMode: 'cover' }}
            source={require('../../assets/ic_uber.png')}
          /> */}
          {/* <Text style={{fontWeight: 'bold', fontSize: 40, marginBottom: 15}}>
            Drive Time
          </Text> */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              textAlign: 'left'
            }}
          >
            Sign In
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 18, marginTop: 8 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 8,
                  marginLeft: 10,
                  color: 'green',
                  textDecorationLine: 'underline'
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g. huuquoc7603@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="******"
              value={password}
              secureTextEntry={showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword)
              }}
              style={styles.showHideButton}
            >
              <Text>{!showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <CheckBox
            title="Remember me"
            onPress={() => setRememberMe(!rememberMe)}
            textStyle={{
              fontSize: 16,
              color: 'gray',
              fontWeight: '500'
            }}
            isChecked={rememberMe}
          />

          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
            <Text style={{ color: 'green', fontSize: 16 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <BottomSheet isVisible={bottomSheetVisible} onSubmit={handleBottomSheetSubmit} />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.line} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleSignInButton}>
          <Image source={require('../../assets/ic_google.png')} style={{ width: 32, height: 32 }} />
          <Text style={{ color: 'black', fontSize: 18 }}>Sign In with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleHelpPress}>
          <Text style={{ fontSize: 16, marginTop: 8, textDecorationLine: 'underline' }}>
            Need Help?
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'center' }}>
            <Text style={{ fontSize: 18}}>Be our driver?</Text>
            <TouchableOpacity onPress={handleRegisterDriver}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'green',
                  textDecorationLine: 'underline'
                }}
              >
                Register Driver Account
              </Text>
            </TouchableOpacity>
          </View>
        {/* <CustomButton 
            style={[styles.buttonStyle, styles.registerButton]} 
            title="Create new account" 
            onPress={handleRegister}
          />
          <CustomButton 
            style={[styles.buttonStyle, styles.driverRegisterButton]} 
            type={ButtonType.outlined}
            title="Join our team? REGISTER DRIVER ACCOUNT!" 
            onPress={handleRegisterDriver}
          /> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing * 2,
    flexDirection: 'column',
    gap: Spacing * 3,
    paddingTop: 80

  },
  group: {
    flexDirection: 'column',
    gap: Spacing,
    alignItems: 'stretch'
  },
  buttonStyle: {
    paddingVertical: Spacing * 1.3
  },
  registerButton: {
    backgroundColor: Colors.secondaryColor,
  },
  input: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  text: {
    marginHorizontal: 10,
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 16,
    fontWeight: 'bold'
  },
  passwordContainer: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  showHideButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 18
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
  signInButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  alternativeLogin: {
    flexDirection: 'row',
    gap: Spacing * 2,
  },
  alternativeLoginContainer: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: FontSize.xLarge,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
