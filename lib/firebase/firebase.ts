import AsyncStorage from '@react-native-async-storage/async-storage'
import { getApps, initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
}

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
// export const messaging = getMessaging(firebaseApp)

export const firebaseVapidKey = process.env.EXPO_PUBLIC_FIREBASE_VAPID_KEY

// android: 165487746211-o8iukacrbi8o37v81qrnkl56mr2l6mig.apps.googleusercontent.com