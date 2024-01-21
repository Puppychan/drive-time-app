import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CheckBox from '@/src/components/input/Checkbox'

import COLORS from '../../src/constants/Color'
import { createAuthAccount } from '@/lib/firebase/auth'
import { ResponseCode } from '@/common/response-code.enum'
import { db } from '@/lib/firebase/firebase'
import { collection, getDoc, addDoc, doc, setDoc, updateDoc, getDocs } from 'firebase/firestore'

export default function Page() {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [btnDisable, setBtnDisable] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  
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

    createAuthAccount(email, password).then((res) => {
      if (res.code === ResponseCode.OK) {
        const { user } = res.body
        console.log('Userrr', user)
        // router.push(`/driver/register/driver-profile?id=${user.uid}`);
      } else {
        ToastAndroid.show(`Register failed: ${res.message}`, ToastAndroid.SHORT)
      }
    })

    const usersCollectionRef = collection(db, 'users');
  const userDocRef = doc(usersCollectionRef, email);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    // Document doesn't exist, create it
    const newUser = {
      name: email,
      password,
      phone: phoneNumber,
    };

    await setDoc(userDocRef, newUser);
    ToastAndroid.show('New user created', ToastAndroid.SHORT)
    console.log ('New user created');
  } else {
    // Document exists, update it
    await updateDoc(userDocRef, {
      name: email,
      password,
    });
    console.log ('User updated');
  }
    
    setBtnDisable(false)
  }
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
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
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
              value={password}
              onChangeText={(text) => setPassword(text)}
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

        <TouchableOpacity
          onPress={() => {
            isChecked? handleNext() : ToastAndroid.show('Please agree to the Terms and Conditions', ToastAndroid.SHORT)
          }}
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
          <Text style={{ fontSize: 18, color: 'white' }}>Sign Up</Text>
        </TouchableOpacity>

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

