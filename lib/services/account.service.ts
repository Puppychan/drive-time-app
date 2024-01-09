import { User, deleteUser } from 'firebase/auth'
import { Timestamp, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { AccountType } from '../common/model-type'
import { db } from '../firebase/firebase'
import { AccountRole } from '../models/account.model'

export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    // validate
    const isUnique = await isUniqueUser(
      user.uid,
      additionalUserInfo.email,
      additionalUserInfo.username,
      additionalUserInfo.role
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
    .then((_value) => {
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
