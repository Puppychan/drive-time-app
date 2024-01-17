import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Spacing from '../../components/Spacing'
import FontSize from '../../components/FontSize'
import { Colors, specialColors } from '../../components/Colors'
// import Font from "../../components/Font";
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
// import { RootStackParamList } from "../types";
import AppTextInput from '../../src/components/app-text-input/AppTextInput'
import { Link, router } from 'expo-router'
// type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Page() {
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
          <AppTextInput placeholder="Email" />
          <AppTextInput placeholder="Password" />
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
        onPress={() => router.push('/(user)/customer/home')}
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
          onPress={() => router.push('/signup')}
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

const styles = StyleSheet.create({})
