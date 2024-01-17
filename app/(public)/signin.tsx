// import { useRouter } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
// export default function Page() {
//   return (
//     <ImageBackground source={require('../../assets/saigon.jpg')} style={styles.backgroundImage}>
//       <View style={styles.overlay} />
//       <View style={styles.container}>
//         <Text style={styles.titleText}>Login</Text>
//         <TextInput style={styles.input} placeholder="Username" />
//         <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
//         <TouchableOpacity style={styles.loginButton}>
//           <Text style={styles.buttonText}>LOGIN</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.forgotPasswordButton}>
//           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//         </TouchableOpacity>
//         <StatusBar style="auto" />
//       </View>
//     </ImageBackground>
//   )
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover'
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.75)'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'stretch',
//     paddingBottom: 250,
//     paddingHorizontal: 30
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#fff'
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 16,
//     padding: 10,
//     borderRadius: 8
//   },
//   loginButton: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 16
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   forgotPasswordButton: {
//     alignSelf: 'center'
//   },
//   forgotPasswordText: {
//     color: '#fff',
//     fontSize: 16,
//     textDecorationLine: 'underline'
//   }
// })

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
