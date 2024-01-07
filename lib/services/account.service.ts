import { User, deleteUser } from 'firebase/auth'
import { Timestamp, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as QRCode from 'qrcode'

import { ResponseCode } from '@/common/response-code.enum'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { AccountType } from '../common/model-type'
import { db, storage } from '../firebase/firebase'
import { AccountRole } from '../models/account.model'

// Function to generate QR Code and upload it
const generateDriverQRCode = async (driverId: string) => {
  try {
    // Generate QR Code as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(driverId)

    // Convert Data URL to Blob
    const blob = await (await fetch(qrCodeDataUrl)).blob()

    // Create a reference for the QR code in Firebase Storage
    const storageRef = ref(storage, `qrcodes/${driverId}.png`)

    // Upload the Blob to Firebase Storage
    await uploadBytes(storageRef, blob)

    // Get the public download URL
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    console.error('Error generating and uploading QR code:', error)
    throw error
  }
}
export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    // generate and validate based on role
    let qrCode: string | null = null
    if (additionalUserInfo.role === AccountRole.Driver && 'QRCode' in additionalUserInfo) {
      qrCode = await generateDriverQRCode(user.uid)
      additionalUserInfo.QRCode = qrCode
    }
    // validate
    const isUnique = await isUniqueUser(
      user.uid,
      additionalUserInfo.email,
      additionalUserInfo.username,
      additionalUserInfo.role,
      qrCode
    )
    if (!isUnique) {
      throw new Error(`User with email ${additionalUserInfo.email} already exists`)
    }

    const currentDate = new Date()

    // Add user to Firestore
    const userRef = doc(db, CollectionName.ACCOUNTS, user.uid)
    await setDoc(userRef, {
      // email: user.email, // Email from the authenticated user
      ...additionalUserInfo, // Additional user information
      createdDate: Timestamp.fromDate(currentDate),
      updatedDate: Timestamp.fromDate(currentDate)
    })
  } catch (error) {
    throw error
  }
}

export async function handleUserCreationError(user: User, parentError: any) {
  // Implement cleanup logic here.
  await deleteUser(user)
    .then((value) => {
      const errorCode = parentError?.code
      return new ResponseDto(
        errorCode ?? ResponseCode.BAD_GATEWAY,
        'Storing user information unsucessfully. Please try again later!',
        'User deleted successfully after failed additional info addition after storing user information unsuccessfully.'
      )
    })
    .catch((error) => {
      const errorCode = error?.code
      return new ResponseDto(
        errorCode ?? ResponseCode.BAD_GATEWAY,
        'Discard registered information unsuccessfully',
        `Failed to delete user after unsuccessful info addition: ${error}`
      )
    })
}

// ------------------------------------
const isUniqueUser = async (
  userId: string,
  email: string,
  username: string,
  role: AccountRole,
  ...props: unknown[]
) => {
  try {
    const userCollection = collection(db, CollectionName.ACCOUNTS)
    const queries = [
      query(userCollection, where('userId', '==', userId)),
      query(userCollection, where('email', '==', email)),
      query(userCollection, where('username', '==', username))
    ]

    // specific check for role
    if (role === AccountRole.Driver) {
      queries.push(query(userCollection, where('QRCode', '==', props[0])))
    }

    const results = await Promise.all(queries.map(getDocs))
    return results.every((querySnapshot) => querySnapshot.empty)
  } catch (error) {
    // TODO: handle error exception
    throw error
  }
}
