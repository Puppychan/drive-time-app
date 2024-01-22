// import { useRouter } from 'expo-router'
// import { useState } from 'react'
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert
// } from 'react-native'

// import { ResponseCode } from '@/common/response-code.enum'
// import { signIn } from '@/lib/firebase/auth'
// import CheckBox from '@/src/components/input/Checkbox'

// import { Colors, specialColors } from '../../components/Colors'
// import FontSize from '../../components/FontSize'
// import Spacing from '../../components/Spacing'
// import BottomSheet from '@/src/components/modal/bottom-sheet'

// import * as Google from 'expo-auth-session/providers/google'
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithCredential,
// } from 'firebase/auth'
// import {auth} from '@/lib/firebase/firebase'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// export default function Page() {
//   const router = useRouter()
//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState('')
//   const [rememberMe, setRememberMe] = useState<boolean>(true)
//   const [showPassword, setShowPassword] = useState(false)
//   const [userInfo, setUserInfo] = useState(false)
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     androidClientId: '165487746211-o8iukacrbi8o37v81qrnkl56mr2l6mig.apps.googleusercontent.com',

//   });

//   const handleRegister = () => router.push('/signup')

//   const handleLogin = async () => {
//     if (email.trim() === '') {
//       ToastAndroid.show('Email is required', ToastAndroid.SHORT)
//       return
//     } else if (password.trim() === '') {
//       ToastAndroid.show('Password is required', ToastAndroid.SHORT)
//       return
//     }

//     signIn(email, password, rememberMe).then((res) => {
//       if (res.code === ResponseCode.OK) {
//         const user = res.body
//         console.log(user)
//         ToastAndroid.show(`Login successfully`, ToastAndroid.SHORT)
//         router.push(`/(user)/customer/home`)
//       } else {
//         ToastAndroid.show(`Login failed: ${res.message}`, ToastAndroid.SHORT)
//       }
//     })
//   }

//   const handleHelpPress = () => {
//     Alert.alert(
//       'Technical Support',
//       'For further information, please contact huuquoc7603@gmail.com'
//     )
//   }

//   const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

//   const handleBottomSheetSubmit = (email: string) => {
//     // Do something with the email state, e.g., send it to the server
//     console.log('Submitted email:', email)

//     // Close the BottomSheet
//     setBottomSheetVisible(false)
//   }

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View>
//           <Image
//             style={{ width: 100, height: 100, resizeMode: 'cover' }}
//             source={require('../../assets/ic_uber.png')}
//           />
//           <Text
//             style={{
//               fontSize: 32,
//               fontWeight: 'bold',
//               textAlign: 'left'
//             }}
//           >
//             Sign In
//           </Text>
//           <View style={{ flexDirection: 'row' }}>
//             <Text style={{ fontSize: 18, marginTop: 8 }}>Don't have an account?</Text>
//             <TouchableOpacity onPress={handleRegister}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   marginTop: 8,
//                   marginLeft: 10,
//                   color: 'green',
//                   textDecorationLine: 'underline'
//                 }}
//               >
//                 Register
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View>
//           <Text style={styles.inputTitle}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="E.g. huuquoc7603@gmail.com"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//           />
//         </View>
//         <View>
//           <Text style={styles.inputTitle}>Password</Text>
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="******"
//               value={password}
//               secureTextEntry={showPassword}
//               onChangeText={(text) => setPassword(text)}
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 setShowPassword(!showPassword)
//               }}
//               style={styles.showHideButton}
//             >
//               <Text>{!showPassword ? 'Hide' : 'Show'}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View
//           style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}
//         >
//           <CheckBox
//             title="Remember me"
//             onPress={() => setRememberMe(!rememberMe)}
//             textStyle={{
//               fontSize: 16,
//               color: 'gray',
//               fontWeight: '500'
//             }}
//             isChecked={rememberMe}
//           />

//           <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
//             <Text style={{ color: 'green', fontSize: 16 }}>Forgot Password?</Text>
//           </TouchableOpacity>
//           <BottomSheet isVisible={bottomSheetVisible} onSubmit={handleBottomSheetSubmit} />
//         </View>

//         <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <View style={styles.line} />
//           <Text style={styles.text}>Or</Text>
//           <View style={styles.line} />
//         </View>

//         <TouchableOpacity style={styles.googleSignInButton}>
//           <Image source={require('../../assets/ic_google.png')} style={{ width: 32, height: 32 }} />
//           <Text style={{ color: 'black', fontSize: 18 }}>Sign In with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleHelpPress}>
//           <Text style={{ fontSize: 16, marginTop: 8, textDecorationLine: 'underline' }}>
//             Need Help?
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: Spacing * 2,
//     paddingVertical: Spacing * 4,
//     flexDirection: 'column',
//     gap: Spacing * 3
//   },
//   buttonStyle: {
//     paddingVertical: Spacing * 1.3
//   },
//   registerButton: {
//     backgroundColor: Colors.secondaryColor
//   },
//   input: {
//     height: 55,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 10,
//     fontSize: 16
//   },
//   inputTitle: {
//     fontSize: 18,
//     marginBottom: 10
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)'
//   },
//   text: {
//     marginHorizontal: 10,
//     color: 'rgba(0, 0, 0, 0.4)',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   passwordContainer: {
//     position: 'relative',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc'
//   },
//   showHideButton: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     padding: 18
//   },
//   driverRegisterButton: {
//     paddingVertical: Spacing * 1.1
//   },
//   specialTextStyle: {
//     color: specialColors.primary,
//     fontSize: FontSize.small
//   },
//   alternativeLoginButton: {
//     padding: Spacing,
//     backgroundColor: specialColors.gray,
//     borderRadius: 3
//   },
//   signInButton: {
//     backgroundColor: 'black',
//     borderRadius: 30,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginTop: 10
//   },
//   googleSignInButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center'
//   },
//   alternativeLogin: {
//     flexDirection: 'row',
//     gap: Spacing * 2
//   },
//   alternativeLoginContainer: {
//     alignItems: 'center',
//     gap: Spacing
//   }
// })

import { View } from 'react-native'
import { useEffect } from 'react'
import { store } from '@/store'
import Signup from '@/src/screens/Authen/SignUp'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignIn from '@/src/screens/Authen/SignIn'

export default function Page() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: '165487746211-o8iukacrbi8o37v81qrnkl56mr2l6mig.apps.googleusercontent.com'
  })
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential).then((res) => {
        console.log(res)
        AsyncStorage.setItem('user', JSON.stringify(res.user))
        store.dispatch({ type: 'SET_USER', payload: res.user })
      })
    }
  })
  return (
    <View>
      <SignIn promptAsync={promptAsync} />
    </View>
  )
}