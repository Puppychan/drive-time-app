import { User, deleteUser } from 'firebase/auth'
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { AccountType } from '../common/model-type'
import { db } from '../firebase/firebase'
import { FavoriteLocation } from '../models/favorite-location.model'
import { ADD_MEMBERSHIP_POINT } from '../common/membership.constant'

export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    console.log('Create user dbnfkjsdbsdf')
    // validate
    const isUnique = await isUniqueUser(
      user.uid,
      additionalUserInfo.email,
      additionalUserInfo.username
    )
    if (!isUnique) {
      throw new Error(`User with email ${additionalUserInfo.email} already exists`)
    }

    // add created at and updated at
    const currentDate = new Date()
    additionalUserInfo.createdDate = Timestamp.fromDate(currentDate)
    additionalUserInfo.updatedDate = Timestamp.fromDate(currentDate)
    additionalUserInfo.userId = user.uid

    // Create a reference to the document with the custom ID
    const accountRef = doc(db, CollectionName.ACCOUNTS, additionalUserInfo.userId)
    // Set the data for the document with the custom ID
    await setDoc(accountRef, additionalUserInfo)

    return accountRef
  } catch (error) {
    console.log('Errorrr', error)
    throw error
  }
}

export const updateCustomerMembership = async (userId: string) => {
  try {
    const customerRef = doc(db, CollectionName.ACCOUNTS, userId)
    const customerSnapshot = await getDoc(customerRef)
    if (customerSnapshot.exists()) {
      await updateDoc(customerRef, {
        membership: increment(ADD_MEMBERSHIP_POINT),
        updatedAt: Timestamp.fromDate(new Date())
      })
    }

    return new ResponseDto(ResponseCode.OK, 'Membership updated successfully', null)
  } catch (error) {
    console.error('Error updating membership:', error)
    return handleUserException(error, 'Updating membership point')
  }
}

export const updateAccountDeviceTokenList = async (userId: string, deviceTokenId: string) => {
  try {
    const accountRef = doc(db, CollectionName.ACCOUNTS, userId)
    const customerSnapshot = await getDoc(accountRef)
    if (customerSnapshot.exists()) {
      await updateDoc(accountRef, {
        deviceTokenIdList: arrayUnion(deviceTokenId),
        updatedAt: Timestamp.fromDate(new Date())
      })
    } else {
      throw new Error(`User with id ${userId} does not exist`)
    }

    return new ResponseDto(ResponseCode.OK, 'User device added successfully', null)
  } catch (error) {
    console.error('Error adding user device:', error)
    return handleUserException(error, 'Adding user device')
  }
}

export async function handleUserCreationError(user: User, parentError: any): Promise<ResponseDto> {
  // Implement cleanup logic here.
  return deleteUser(user)
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

function handleUserException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} review unsuccessfully`,
    `${type} review unsuccessfully: ${error}`
  )
}

// ------------------------------------
const isUniqueUser = async (userId: string, email: string, username: string) => {
  try {
    const userCollection = collection(db, CollectionName.ACCOUNTS)
    const queries = [
      query(userCollection, where('userId', '==', userId)),
      query(userCollection, where('email', '==', email)),
      query(userCollection, where('username', '==', username))
    ]

    // specific check for role
    // if (role === AccountRole.Driver) {
    //   queries.push(query(userCollection, where('QRCode', '==', props[0])))
    // }

    const results = await Promise.all(queries.map(getDocs))
    return results.every((querySnapshot) => querySnapshot.empty)
  } catch (error) {
    // TODO: handle error exception
    throw error
  }
}
