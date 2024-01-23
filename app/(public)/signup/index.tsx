import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ResponseCode } from '@/common/response-code.enum'
import { Colors } from '@/components/Colors'
import { createAuthAccount } from '@/lib/firebase/auth'
import { ButtonType, CustomButton } from '@/src/components/button/Buttons'
import { Input } from '@/src/components/input/TextInput'
import { AccountRole } from '@/lib/models/account.model'
import { auth } from '@/lib/firebase/firebase'
import CheckBox from '@/src/components/input/Checkbox'

import COLORS from '@/src/constants/Color'

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const {role} = useLocalSearchParams<{ role?: string }>();
  const [isPasswordShown, setIsPasswordShown] = useState(true)
  const [isChecked, setIsChecked] = useState(false)

  const handleNext = async () => {
    if (email.trim() === '') {
      ToastAndroid.show('Email is required', ToastAndroid.SHORT)
      return
    }

    if (password.trim() === '') {
      ToastAndroid.show('Password is required', ToastAndroid.SHORT)
      return
    }

    if (!isChecked) {
      ToastAndroid.show('Please ensure you agree our Terms and Condition', ToastAndroid.SHORT)
      return
    }

    createAuthAccount(email, password)
    .then((res) => {
      if (res.code === ResponseCode.OK) {
        const {user}  = res.body
        router.push({pathname: `/signup/profile`, params: {uid: user.uid, role: role ?? AccountRole.Customer}});
      }
    })
    .catch( (error) => {
      console.log(error)
      let message = error.message ?? ""
      ToastAndroid.show(`Register failed. ${message}`, ToastAndroid.SHORT)

    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white,  paddingHorizontal: 20,  paddingVertical: 60, }}>
      <View style={{flexDirection: 'column', gap: 20}}>
        <View >
          <Image
            style={{ width: 100, height: 100, resizeMode: 'cover', marginBottom: 5 }}
            source={require('../../../assets/logo_no_background.png')}
          />
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              marginTop: 12,
              color: COLORS.black
            }}
          >
            Register {role ?? 'Account'}
          </Text>

          <Text
            style={{
              fontSize: 18,
              marginTop: 8
            }}
          >
            Drive everywhere with us
          </Text>
        </View>

        <View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
                marginTop: 8,
                marginBottom: 10
              }}
            >
              Email Address *
            </Text>

            <View
              style={{
                width: '100%',
                height: 55,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22
              }}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: '100%',
                  height: 55
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
                marginVertical: 8
              }}
            >
              Password *
            </Text>

            <View
              style={{
                width: '100%',
                height: 55,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22
              }}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: '100%'
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: 'absolute',
                  right: 12
                }}
              >
                {!isPasswordShown ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <CheckBox
            title=""
            isChecked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            style={{ backgroundColor: 'red', borderWidth: 0 }}
            textStyle={{ color: 'red' }}
          />

          <Text style={{fontSize: 16, marginTop: 3}}>
            {'I agree to the '}
          </Text>
          <TouchableOpacity style={{ marginTop: 3 }}>
            <Text style={{ fontWeight: '500', fontSize: 16, textDecorationLine: 'underline' }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, marginTop: 3}}>
            {' *'}
          </Text>

        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 55,
            borderWidth: 1,
            borderColor: COLORS.grey,
            backgroundColor: 'black',
            marginRight: 4,
            borderRadius: 15,
            paddingHorizontal: 16,
            marginTop: 20
          }}
        >
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>Continue</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 30
          }}
        >
          <Text style={{ fontSize: 18, color: COLORS.black }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/signin')}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
                textDecorationLine: 'underline'
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup
