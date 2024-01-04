import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import * as QRCode from 'qrcode'

import { db } from '../firebase/firebase'
import { AccountType } from '../model-type'

// Function to generate a QR Code
const generateQRCode = async (text: string) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(text)
    return qrCodeDataURL
  } catch (err) {
    // console.error('Error generating QR code', err);
    return null
  }
}

export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    const userRef = doc(db, 'accounts', user.uid)
    await setDoc(userRef, {
      // email: user.email, // Email from the authenticated user
      ...additionalUserInfo, // Additional user information
      createdAt: new Date().getTime(), // Timestamp of when the user was created
      updatedAt: new Date().getTime() // Timestamp of when the user was last updated
    })
  } catch (error) {
    // TODO: handle error exception
    // console.error('Error adding user to Firestore:', error)
  }
}
