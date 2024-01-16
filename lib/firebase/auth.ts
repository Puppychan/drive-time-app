import {
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  setPersistence,
  inMemoryPersistence,
  AuthErrorCodes
} from 'firebase/auth'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'

import { ResponseDto } from '@/common/response.dto'
import { AccountType } from '@/lib/common/model-type'
import { addUserToDatabase, handleUserCreationError } from '@/lib/services/account.service'
import { auth } from '@/lib/firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'

export function onAuthStateChanged() {
  return () => {}
}

export async function signInWithGoogle() {}

export async function signOut() {
  auth.signOut();
  await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.FALSE)
  await AsyncStorage.setItem(Constant.AUTO_LOGIN_KEY, Constant.FALSE)
  await AsyncStorage.setItem(Constant.USER_EMAIL_KEY, '')
}


export async function signIn(email: string, password: string, remember: boolean): Promise<ResponseDto> {
  if (!remember) setPersistence(auth, inMemoryPersistence);
  return (
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      await AsyncStorage.setItem(Constant.LOGIN_STATE_KEY, Constant.TRUE)
      await AsyncStorage.setItem(Constant.AUTO_LOGIN_KEY, remember ? Constant.TRUE : Constant.FALSE)
      await AsyncStorage.setItem(Constant.USER_EMAIL_KEY, email)
      return new ResponseDto(ResponseCode.OK, 'Login successfully', {...user})
    })
    .catch(async (error) => {
      await signOut();

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
    .then((value) => {
      // if add user information to database successfully
      return new ResponseDto(ResponseCode.OK, 'Signing up user successfully', {
        ...user,
        ...additionalUserInfo
      })
    })
    .catch(async (error) => {
      console.log(`~ ~ ~ ~ auth.ts, line 73: `,error)
      return await handleUserCreationError(user, error)
    })
  );
}

export async function createUser(email: string, password: string, otherUserInfo: AccountType) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user
      await addUserToDatabase(user, otherUserInfo)
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

