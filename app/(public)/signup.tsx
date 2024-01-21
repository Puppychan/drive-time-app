import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/components/Colors'
import CheckBox from '@/src/components/input/Checkbox'

import Button from '../../src/components/button/Button'
import COLORS from '../../src/constants/Color'

const Signup = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              marginTop: 12,
              color: COLORS.black
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 18,
              marginTop: 8
            }}
          >
            Connect with your friend today!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              marginTop: 8,
              marginBottom: 10
            }}
          >
            Email Address
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
            Mobile Number
          </Text>

          <View
            style={{
              width: '100%',
              height: 55,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22
            }}
          >
            <TextInput
              placeholder="+91"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: 55
              }}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '80%'
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
            Password
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
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 12,
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

          <Text style={{ alignSelf: 'center', fontSize: 16, marginTop: 3, marginLeft: -120 }}>
            I agree to the{' '}
          </Text>
          <TouchableOpacity style={{ marginTop: 3 }}>
            <Text style={{ fontWeight: '500', fontSize: 16, textDecorationLine: 'underline' }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Sign Up"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4
          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14 }}>Or</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => console.log('Pressed')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 55,
            borderWidth: 1,
            borderColor: COLORS.grey,
            marginRight: 4,
            borderRadius: 15
          }}
        >
          <Image
            source={require('../../assets/ic_google.png')}
            style={{
              height: 36,
              width: 36,
              marginRight: 8
            }}
            resizeMode="contain"
          />

          <Text style={{ fontSize: 18 }}>Sign in with Google</Text>
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
                marginLeft: 6
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
