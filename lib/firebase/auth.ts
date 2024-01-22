import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  AuthErrorCodes,
  updateProfile,
  inMemoryPersistence,
  sendPasswordResetEmail,
  getReactNativePersistence
} from 'firebase/auth'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'
import { Constant } from '@/components/Constant'
import { AccountType } from '@/lib/common/model-type'
import { auth } from '@/lib/firebase/firebase'
import { addUserToDatabase, getUserById, handleUserCreationError } from '@/lib/services/account.service'

export function onAuthStateChanged() {
  _onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user signed in: ', user.email)
    } else {
      console.log('user signed out ')
    }
  })
}

export function resetPasswordWithEmail(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent successfully')
    })
    .catch((error) => {
      console.error('Error sending password reset email:', error)
    })
}

// export async function signInWithGoogle() {
//   const credential = GoogleAuthProvider.credential(id_token);

//   // Sign in with credential from the Google user.
//   signInWithCredential(auth, credential).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// }

export async function signOut(): Promise<ResponseDto> {
  try {
    await auth.signOut()
    await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.FALSE)
    await AsyncStorage.removeItem(Constant.TOKEN_KEY)
    return new ResponseDto(ResponseCode.OK, 'Sign out successfully')
  }
  catch (e) {
    console.log("~~~~~~~ signOut(): ", e)
    return new ResponseDto(ResponseCode.BAD_GATEWAY, `Sign out failed: ${e}`)
  }
}


export async function signIn(email: string, password: string, remember: boolean): Promise<ResponseDto> {
  if (!remember) await auth.setPersistence(inMemoryPersistence)
  else await auth.setPersistence(getReactNativePersistence(AsyncStorage))
  
  return (
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const authUser = userCredential.user
      const user = await getUserById(authUser.uid)
      console.log("role: ", user?.role)

      if (user) {
        const token = await authUser.getIdToken();
        await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.TRUE)
        await AsyncStorage.setItem(Constant.TOKEN_KEY, token)
        await AsyncStorage.setItem(Constant.USER_ROLE_KEY, user.role)
        return new ResponseDto(ResponseCode.OK, 'Login successfully', {user})
      }
      throw new Error('Login failed: user not found in database')
    })
    .catch( (error) => {
      console.log(error)
      let message = error.message ?? "Error caught"
      if (error.code) {
        switch (error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            message = 'Invalid email'
            break;
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            message = 'Invalid login credentials'
            break;
          case AuthErrorCodes.INVALID_PASSWORD:
            message = 'Wrong password'
            break;
        }
      }
      throw new Error(message)
    })
  )
}

export async function createAuthAccount(email: string, password: string): Promise<ResponseDto> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return new ResponseDto(ResponseCode.OK, 'Register user successfully', { user })
    })
    .catch((error) => {
      console.log("~~~~~~~ createAuthAccount(): ", error)
      throw error
    })
}

export async function addUser(user: User, additionalUserInfo: AccountType): Promise<ResponseDto> {
  try {
    const doc = await addUserToDatabase(user, additionalUserInfo)
    console.log("user doc created: ", doc)
    await updateProfile(user, {
      displayName: additionalUserInfo.username,
      photoURL: additionalUserInfo.avatar
    })
    return new ResponseDto(ResponseCode.OK, 'Added user successfully', {
      ...user,
      ...additionalUserInfo
    })
  }
  catch (error) {
    console.log(`~ ~ ~ ~ auth.ts, line 127: `,error)
    throw error
  }
}

export async function createUser(email: string, password: string, otherUserInfo: AccountType) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user
      addUserToDatabase(user, otherUserInfo)
        .then((value) => {
          // if add user information to database successfully
          return new ResponseDto(
            ResponseCode.OK,
            'Signing up user successfully',
            new SuccessResponseDto(otherUserInfo, value.id)
          )
        })
        .catch(async (error) => {
          return await handleUserCreationError(user, error)
        })
    })
    .catch((error) => {
      // TODO: display to UI
      return new ResponseDto(
        error.code ?? ResponseCode.BAD_GATEWAY,
        'Signing up user unsuccessfully',
        `Failed to signing up the user: ${error}`
      )
    })
}
