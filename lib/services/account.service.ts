import { User } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as QRCode from 'qrcode'
import { ProgressBarAndroidComponent } from 'react-native'

import { Driver } from './../models/driver.model'
import { CollectionName } from '../common/collection-name.enum'
import { AccountType } from '../common/model-type'
import { db, storage } from '../firebase/firebase'
import { AccountRole } from '../models/account.model'

const generateQRCodeImage = async (data: string | QRCode.QRCodeSegment[]) => {
  try {
    return new Promise((resolve, reject) => {
      QRCode.toBuffer(
        data,
        {
          type: 'png',
          margin: 1,
          width: 200
        },
        (error, buffer) => {
          if (error) {
            //  if throw error
            reject(error)
          } else {
            // if
            resolve(buffer)
          }
        }
      )
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}
// Function to generate QR Code and upload it
export const uploadQRCodeToStorage = async (data: string | QRCode.QRCodeSegment[]) => {
  const storagePath = `qrcodes/${Date.now()}.png`
  const qrRef = ref(storage, storagePath)
  const qrImageBuffer = await generateQRCodeImage(data)

  // Asserting that qrImageBuffer is of type Buffer
  if (!(qrImageBuffer instanceof Buffer)) {
    throw new Error('QR code generation did not return a valid buffer.')
  }

  try {
    const snapshot = await uploadBytes(qrRef, qrImageBuffer)
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    console.error('Error uploading QR code:', error)
    throw error
  }
}

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

export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    // generate and validate based on role
    let qrCode: string | null = null
    // if (
    //   additionalUserInfo.role === AccountRole.Driver &&
    //   typeof additionalUserInfo == typeof Driver
    // ) {
    //   qrCode = await uploadQRCodeToStorage(user.uid)
    //   additionalUserInfo.QRCode = qrCode
    // }
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

    // Add user to Firestore
    const userRef = doc(db, CollectionName.ACCOUNTS, user.uid)
    await setDoc(userRef, {
      // email: user.email, // Email from the authenticated user
      ...additionalUserInfo, // Additional user information
      createdAt: new Date().getTime(), // Timestamp of when the user was created
      updatedAt: new Date().getTime() // Timestamp of when the user was last updated
    })
  } catch (error) {
    throw error
  }
}
