import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { ResponseCode } from '@/common/response-code.enum'

import { ResponseDto } from './../../common/response.dto'
import { AccountType } from '../common/model-type'
import { auth } from '../firebase/firebase'
import { addUserToDatabase, handleUserCreationError } from '../services/account.service'

export function onAuthStateChanged(cb: any) {
  return () => {}
}

export async function signInWithGoogle() {}

export async function signOut() {}

export async function createUser(email: string, password: string, otherUserInfo: AccountType) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user
      await addUserToDatabase(user, otherUserInfo)
        .then((value) => {
          // if add user information to database successfully
          return new ResponseDto(ResponseCode.OK, 'Signing up user successfully', {
            ...user,
            ...otherUserInfo
          })
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

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    // console.log('User signed in:', userCredential.user)
  } catch (error) {
    // console.error('Error signing in:', error)
  }
}
