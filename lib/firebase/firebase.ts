import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signOut, initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const dotenv = require('dotenv')
// dotenv.config()
// import 'dotenv/config'
console.log(process.env.EXPO_PUBLIC_FIREBASE_API_KEY)

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
}

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// export const auth = getAuth(firebaseApp)
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
