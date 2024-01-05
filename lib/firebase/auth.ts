import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'firebase/auth'

import { AccountType } from '../common/model-type'
import { auth, db } from '../firebase/firebase'
import { addUserToDatabase } from '../services/account.service'

export function onAuthStateChanged(cb: any) {
  return () => {}
}

export async function signInWithGoogle() {}

export async function signOut() {}

export async function createUser(email: string, password: string, otherUserInfo: AccountType) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user

        // Add additional user info in Firestore
        await addUserToDatabase(user, otherUserInfo).catch((error) => {
          // TODO: display error message
          console.error('Error adding user to database:', error)
          deleteUser(user)
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        throw new Error(errorCode + ': ' + errorMessage)
      })
  } catch (error) {
    // console.error('Error signing up:', error)
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    // console.log('User signed in:', userCredential.user)
  } catch (error) {
    // console.error('Error signing in:', error)
  }
}
