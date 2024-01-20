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

// import Font from "../../components/Font";

// import { RootStackParamList } from "../types";
// import AppTextInput from '../../src/components/app-text-input/AppTextInput'

// type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [loginDisable, setLoginDisable] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const handleRegister = () => router.push('/signup')

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

    signIn(email, password, rememberMe).then((res) => {
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
      <View
        style={{
          padding: Spacing * 2
        }}
      >
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.black,
              // fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              // fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: '60%',
              textAlign: 'center'
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3
          }}
        >
          {/* <AppTextInput placeholder="Email" required={true} value={email} onChangeText={setEmail} />
          <AppTextInput placeholder="Password" /> */}
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
          <CheckBox
            title="Remember me"
            isChecked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            style={{ color: Colors.sky_blue }}
            textStyle={{ color: Colors.black }}
          />
        </View>

        <View>
          <Text
            style={{
              // fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: specialColors.primary,
              alignSelf: 'flex-end'
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogin} 
          disabled={loginDisable}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.black,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: specialColors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing
          }}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-bold"],
              color: specialColors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        {/* <Link href={"/signup"} asChild> */}
        <TouchableOpacity
          onPress={handleRegister}
          // style={{
          //   padding: Spacing,
          // }}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-semiBold"],
              color: specialColors.text,
              textAlign: 'center',
              fontSize: FontSize.small
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
        {/* </Link> */}
        <View
          style={{
            marginVertical: Spacing * 3
          }}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-semiBold"],
              color: specialColors.primary,
              textAlign: 'center',
              fontSize: FontSize.small
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: specialColors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing
              }}
            >
              <Ionicons name="logo-google" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: specialColors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing
              }}
            >
              <Ionicons name="logo-apple" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: specialColors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing
              }}
            >
              <Ionicons name="logo-facebook" color={specialColors.text} size={Spacing * 2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8
  }
})
