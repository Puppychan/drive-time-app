import { User, deleteUser } from 'firebase/auth'
import {
  Timestamp,
  Transaction,
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
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { NotFoundException } from '../common/handle-error.interface'
import { ADD_MEMBERSHIP_POINT } from '../common/membership.constant'
import { AccountType } from '../common/model-type'
import { db } from '../firebase/firebase'

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

export const updateCustomerMembershipPoints = async (
  userId: string,
  transaction: null | Transaction = null
) => {
  try {
    const customerRef = doc(db, CollectionName.ACCOUNTS, userId)
    if (transaction) {
      const customerSnapshot = await transaction.get(customerRef)
      if (customerSnapshot.exists()) {
        transaction.update(customerRef, {
          membershipPoints: increment(ADD_MEMBERSHIP_POINT),
          updatedAt: Timestamp.fromDate(new Date())
        })
      }
    } else {
      // if not inside transaction
      const customerSnapshot = await getDoc(customerRef)
      if (customerSnapshot.exists()) {
        await updateDoc(customerRef, {
          membership: increment(ADD_MEMBERSHIP_POINT),
          updatedAt: Timestamp.fromDate(new Date())
        })
      }
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
      throw new NotFoundException(`User with id ${userId} does not exist`)
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

export async function getAccountById(accountId: string) {
  try {
    const accountRef = doc(db, CollectionName.ACCOUNTS, accountId)
    const accountSnapshot = await getDoc(accountRef)

    if (!accountSnapshot.exists()) {
      throw new NotFoundException('Account not found')
    }

    const accountDetails = accountSnapshot.data()
    return new ResponseDto(
      ResponseCode.OK,
      `Account found`,
      new SuccessResponseDto(accountDetails, accountRef.id)
    )
  } catch (error) {
    console.error(`Error retrieving account: ${error}`)
    return handleUserException(error, 'Get account details')
  }
}
// ------------------------------------
function handleUserException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} review unsuccessfully`,
    `${type} review unsuccessfully: ${error}`
  )
}
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
    throw error
  }
}

export async function getUserById(userId: string){
  try {
    const userRef = doc(db, CollectionName.ACCOUNTS, userId)
    const userSnap = await getDoc(userRef)
    let user = null
    if (userSnap.exists()) {
      user = userSnap.data();
    }
    return user
  }
  catch (e) {
    throw e
  }
  
}