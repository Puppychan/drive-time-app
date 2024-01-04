
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { auth, db } from '../firebase/firebase'
import { addUserToDatabase } from '../services/account.service'
import { AccountType } from '../model-type'

export function onAuthStateChanged(cb: any) {
  return () => {}
}

export async function signInWithGoogle() {
  return
}

export async function signOut() {
  return
}



export async function createUser(email: string, password: string, otherUserInfo: AccountType) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user

        // Add additional user info in Firestore
        addUserToDatabase(user, otherUserInfo)
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
