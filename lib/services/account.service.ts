import { User, deleteUser, updateProfile } from 'firebase/auth'
import {
  Query,
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
import { startOfDay, startOfMonth, startOfWeek } from 'date-fns'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { NotFoundException } from '../common/handle-error.interface'
import { ADD_MEMBERSHIP_POINT } from '../common/membership.constant'
import { AccountType } from '../common/model-type'
import { auth, db } from '../firebase/firebase'
import { getDownloadUrl, uploadImage } from '@/lib/firebase/storage'
import { AVATAR_REF } from '@/components/Constant'
import { AccountRole } from '../models/account.model'
import { TransportType } from '../models/transport.model'
import { Driver } from '../models/driver.model'



export async function updateAvatar(userId: string, avatarUri: string | null) {
  try {
    let avatar = null
    if (avatarUri) {
      const imageRef = `${AVATAR_REF}/${userId}.jpg`
      await uploadImage(avatarUri, imageRef)
      const res = await getDownloadUrl(imageRef)
      if (res.code === ResponseCode.OK) {
        const downloadUrl = res.body
        avatar = downloadUrl
      }
    }
    console.log("avatar: ", avatar)

    await updateDoc(doc(db, CollectionName.ACCOUNTS, userId), {
      avatar: avatar,
      updatedDate: Timestamp.fromDate(new Date())
    });
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: avatar
      })
    }
    return new ResponseDto(ResponseCode.OK, "Updated profile picture successfully", avatar);
  }
  catch (e) {
    console.log(e)
    throw e

  }
}

export async function getAllUsers() {
  try {
    const userSnapshot = await getDocs(collection(db, CollectionName.ACCOUNTS));
    const users = userSnapshot.docs.map((doc) => doc.data());
    return new ResponseDto(ResponseCode.OK, 'Users fetched successfully', new SuccessResponseDto(users, ''));
  } catch (error) {
    console.error('Error fetching users:', error);
    return handleUserException(error, 'Fetching');
  }
}

export async function getUsersByRole(role: string) {
  try {
    const userQuery = query(
      collection(db, CollectionName.ACCOUNTS),
      where('role', '==', role)
    );
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map((doc) => doc.data());
    return new ResponseDto(ResponseCode.OK, 'Users fetched successfully', users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return handleUserException(error, 'Fetching');
  }
}


export const addUserToDatabase = async (user: User, additionalUserInfo: AccountType) => {
  try {
    // validate
    const isUnique = await isUniqueUser(
      user.uid,
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
    // Set the data for the document with the custom ID
    await setDoc(accountRef, additionalUserInfo)

    return accountRef
  } catch (error) {
    console.log('~~~~~ Errorrr addUserToDatabase', error)
    throw error
  }
}


export const updateUserProfile = async (user: User, additionalUserInfo: AccountType) => {
  try {

    // add created at and updated at
    const currentDate = new Date()
    additionalUserInfo.updatedDate = Timestamp.fromDate(currentDate)
    additionalUserInfo.userId = user.uid


    // Create a reference to the document with the custom ID
    const accountRef = doc(db, CollectionName.ACCOUNTS, additionalUserInfo.userId)
    console.log("accountRef: ", accountRef)
    // Set the data for the document with the custom ID
    await setDoc(accountRef, additionalUserInfo)
    return new ResponseDto(ResponseCode.OK, "Updated", accountRef)
  } catch (error) {
    console.log('~~~~~ Errorrr addUserToDatabase', error)
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

export const getAllAccountsByUserRole = async (role: AccountRole) => {
  try {
    const accountCollection = collection(db, CollectionName.ACCOUNTS)
    const q = query(
      accountCollection,
      where('role', '==', role),
    )
    return getQuerySnapshotData(q)
  } catch (err) {
    return handleUserException(err, `Render account list based on user role`)
  }
};

export const getDriverListByStatusAndTransport = async (driverStatus: boolean, transportType: TransportType, returnType: 'Car' | 'Default' = 'Car') => {
  try {
    const driverCollection = collection(db, CollectionName.ACCOUNTS)
    const q = query(
      driverCollection,
      where('role', '==', AccountRole.Driver),
      where('isAvailable', '==', driverStatus),
      where('transport.type', '==', transportType)
    )
    if (returnType == 'Car') return getQuerySnapshotAsCar(q)
    else return getQuerySnapshotData(q)
  } catch (err) {
    return handleUserException(err, `Render driver list based on status and transport type`)
  }
};
// export const getDriversTotalIncomeAndDistance = async (timePeriod: 'Today' | 'Week' | 'Month' | 'All', driverStatus: boolean, transportType: TransportType) => {
//   let startTime;

//   switch (timePeriod) {
//     case 'Today':
//       startTime = Timestamp.fromDate(startOfDay(new Date()));
//       break;
//     case 'Week':
//       startTime = Timestamp.fromDate(startOfWeek(new Date()));
//       break;
//     case 'Month':
//       startTime = Timestamp.fromDate(startOfMonth(new Date()));
//       break;
//     case 'All':
//       startTime = Timestamp.fromDate(new Date(0)); // Start of UNIX time
//       break;
//   }

// const driverListResponse = await getDriverListByStatusAndTransport(driverStatus, transportType, 'Default') as ResponseDto
// if (driverListResponse.code && driverListResponse)

// const bookingCollection = collection(db, CollectionName.BOOKINGS);

// const q = query(
//   bookingCollection,
//   where('status', '==', BookingStatus.Success),
//   where('updatedAt', '>=', startTime)
// );

// const querySnapshot = await getDocs(q);

// const results = querySnapshot.docs.map((doc) => {
//   let totalIncome = 0;
//   let totalDistance = 0;

//   const data = doc.data();
//   totalIncome += data.fare;
//   totalDistance += data.distance;

// });

// return { totalIncome, totalDistance };
// };

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

export async function getDriverByIdCar(driverId: string) {
  try {
    // Remove the first 'C' from the user ID
    const modifiedUserId = driverId.replace('C', '');
    return await getAccountById(modifiedUserId)
  } catch (err) {
    return handleUserException(err, 'Get account details using CId')
  }
}

// Function to get a customer's Stripe ID using the account ID
export async function getCustomerStripeId(accountId: string) {
  try {
    const accountRef = doc(db, CollectionName.ACCOUNTS, accountId);
    const accountSnapshot = await getDoc(accountRef);

    if (accountSnapshot.exists()) {
      const accountData = accountSnapshot.data();
      // return accountData.customerStripeId;
      return new ResponseDto(ResponseCode.OK, `Get customer stripe ID successfully`, new SuccessResponseDto(accountData.customerStripeId, accountId))
    } else {
      throw new NotFoundException(`Account with id ${accountId} does not exist`)
    }
  } catch (err) {
    return handleUserException(err, 'Get Customer Stripe ID')
  }
}

// Function to set a customer's Stripe ID using the account ID
export async function setCustomerStripeId(accountId: string, customerStripeId: string) {
  try {
    const accountRef = doc(db, CollectionName.ACCOUNTS, accountId);
    await setDoc(accountRef, { customerStripeId }, { merge: true });
    return new ResponseDto(ResponseCode.OK, `Set customer stripe ID successfully`, null)
  } catch (err) {
    return handleUserException(err, 'Set Customer Stripe ID')
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

    const qMail = query(userCollection, where("email", "==", email))
    const qUsername = query(userCollection, where('username', "==", username))

    const mailSnap = await getDocs(qMail);
    console.log(mailSnap)
    if (!mailSnap.empty) {
      return new ResponseDto(ResponseCode.OK, "Email already in use", false)
    }

    const usernameSnap = await getDocs(qUsername);
    if (!usernameSnap.empty) {
      return new ResponseDto(ResponseCode.OK, "Username already in use", false)
    }

    return new ResponseDto(ResponseCode.OK, "User is unique", true)


  } catch (error) {
    // TODO: handle error exception
    console.log('~~~~~ Errorrr isUniqueUser', error)
    throw error
  }
}

export async function getUserById(userId: string) {
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

async function getQuerySnapshotData(query: Query) {
  const querySnapshot = await getDocs(query)
  const itemList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return new ResponseDto(
    ResponseCode.OK,
    `Render list of accounts successfully`,
    new SuccessResponseDto(itemList, '')
  )
}

const getQuerySnapshotAsCar = async (query: Query) => {
  const querySnapshot = await getDocs(query);
  const cars = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Driver;
    const id = 'C' + doc.id;
    const driverCurrentLocation = data.location
    return {
      id: id,
      mLocation: {
        id: id,
        x: driverCurrentLocation?.latitude ?? 0,
        y: driverCurrentLocation?.longitude ?? 0
      }
    };
  });
  // return cars;
  return new ResponseDto(ResponseCode.OK, 'Fetch car list successfully', new SuccessResponseDto(cars, ''))
};