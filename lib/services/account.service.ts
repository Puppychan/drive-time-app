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

export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    // validate
    const isUnique = await isUniqueUser(
      additionalUserInfo.email,
      additionalUserInfo.username
    )
    if (isUnique.code === ResponseCode.OK && isUnique.body === false) {
      throw new Error(isUnique.message)
    }

    // add created at and updated at
    const currentDate = new Date()
    additionalUserInfo.createdDate = Timestamp.fromDate(currentDate)
    additionalUserInfo.updatedDate = Timestamp.fromDate(currentDate)
    additionalUserInfo.userId = user.uid


    // Create a reference to the document with the custom ID
    const accountRef = doc(db, CollectionName.ACCOUNTS, additionalUserInfo.userId)
    console.log("accountRef: ", accountRef)
    // Set the data for the document with the custom ID
    await setDoc(accountRef, additionalUserInfo)

    return accountRef
  } catch (error) {
    console.log('~~~~~ Errorrr addUserToDatabase', error)
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
const isUniqueUser = async (email: string, username: string) => {
  try {
    const userCollection = collection(db, CollectionName.ACCOUNTS)

    const qMail = query(userCollection, where("email", "==", email))
    const qUsername = query(userCollection, where('username', "==", username))
    console.log(email, " ", username, " ", qMail)
    const querySnapshot = await getDocs(collection(db, CollectionName.ACCOUNTS)); 
    // console.log
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });


    // const mailSnap = await getDocs(qMail); 
    // console.log(mailSnap)
    // if (!mailSnap.empty) {
    //   return new ResponseDto(ResponseCode.OK, "Email already in use", false)
    // }

    // const usernameSnap = await getDocs(qUsername); 
    // if (!usernameSnap.empty) {
    //   return new ResponseDto(ResponseCode.OK, "Username already in use", false)
    // }

    return new ResponseDto(ResponseCode.OK, "User is unique", true)


  } catch (error) {
    // TODO: handle error exception
    console.log('~~~~~ Errorrr isUniqueUser', error)
    throw error
  }
}
