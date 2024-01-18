import {
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  AuthErrorCodes,
  updateProfile,
  getReactNativePersistence,
  inMemoryPersistence
} from "firebase/auth"

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'

import { ResponseDto } from '@/common/response.dto'
import { AccountType } from '@/lib/common/model-type'
import { addUserToDatabase, handleUserCreationError } from '@/lib/services/account.service'
import { auth } from '@/lib/firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'

// export async function autoLogin(): Promise<ResponseDto> {
//   try {
//     const autoLogin = await AsyncStorage.getItem(Constant.AUTO_LOGIN_KEY)
//     console.log("auto login: ", autoLogin)
//     if (autoLogin === Constant.TRUE) {
//       const userEmail = await AsyncStorage.getItem(Constant.USER_EMAIL_KEY);
//       console.log("userEmail: ", userEmail)
//       const authEmail = auth.currentUser?.email
//       console.log(auth.currentUser)
//       console.log("authEmail: ", authEmail)
//       if (userEmail === authEmail) {
//         console.log("hehee")
//         await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.TRUE)
//         return new ResponseDto(ResponseCode.OK, 'Auto Login successfully', {...auth.currentUser})
//       }
//     }
//     console.log("huhu")
//     await signOut()
//     return new ResponseDto(ResponseCode.UNAUTHORIZED, `Auto Login Failed: Unauthorized`)
//   }
//   catch (error) {
//     await signOut()
//     console.log(error);
//   }
// }

export function onAuthStateChanged() {
  _onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user signed in: ", user.email)
    } else {
      console.log("user signed out ")
    }
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

export function signOut() {
  try {
    auth.signOut();
  }
  catch (error) {
    console.warn(error)
  }
}


export async function signIn(email: string, password: string, remember: boolean): Promise<ResponseDto> {
  if (!remember) auth.setPersistence(inMemoryPersistence)
  else auth.setPersistence(getReactNativePersistence(AsyncStorage))
  
  return (
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const token = await user.getIdToken();
      // await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.TRUE)
      await AsyncStorage.setItem(Constant.AUTO_LOGIN_KEY, remember ? Constant.TRUE : Constant.FALSE)
      await AsyncStorage.setItem(Constant.TOKEN_KEY, token)
      return new ResponseDto(ResponseCode.OK, 'Login successfully', {...user})
    })
    .catch( (error) => {
      signOut();

      let message = "Cannot login. Please try again"
      if (error.code) {
        switch (error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            message = "Invalid email"
            break
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            message = "Invalid login credentials"
            break
          case AuthErrorCodes.INVALID_PASSWORD:
            message = "Wrong password" 
            break
          default:
            message = error.message
        }
          
      }
      // TODO: display to UI
      return new ResponseDto(
        error.code ?? ResponseCode.BAD_GATEWAY,
        `${message}`,
        `Login failed: ${error}`
      )
    })
  );

}

export async function createAuthAccount(email: string, password: string): Promise<ResponseDto>{
  return (
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return new ResponseDto(ResponseCode.OK, 'Register user successfully', {...user})
    })
    .catch((error) => {
      // TODO: display to UI
      return new ResponseDto(
        error.code ?? ResponseCode.BAD_GATEWAY,
        `${error.message}`,
        `Failed to register user:  ${error}`
      )
    })
  );
}

export async function addUser(user: User, additionalUserInfo: AccountType): Promise<ResponseDto> {
  return (
    addUserToDatabase(user, additionalUserInfo)
    .then( (value) => {
      // if add user information to database successfully
      return updateProfile(user, {
        displayName: additionalUserInfo.username,
        photoURL: additionalUserInfo.avatar
      })
      .then(() => {
        return new ResponseDto(ResponseCode.OK, 'Signing up user successfully', {
          ...user,
          ...additionalUserInfo
        })
      })
      .catch(e => {
        return new ResponseDto(ResponseCode.OK, 'Signing up user successfully', {
          ...user,
          ...additionalUserInfo
        })
      })

    })
    .catch(async (error) => {
      console.log(`~ ~ ~ ~ auth.ts, line 146: `,error)
      return await handleUserCreationError(user, error)
    })
  );
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

