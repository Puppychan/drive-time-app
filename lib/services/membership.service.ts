import {
  OrderByDirection,
  Timestamp,
  Transaction,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Customer } from '../models/customer.model'
import { Membership } from '../models/membership.model'
import { NotFoundException } from '../common/handle-error.interface'

function handleMembershipException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} membership unsuccessfully`,
    `${type} membership unsuccessfully: ${error}`
  )
}

export async function addMembership(membershipData: Membership): Promise<ResponseDto> {
  try {
    let id = '';
    await runTransaction(db, async () => {
      // add created at and updated at
      const date = new Date()
      membershipData.createdAt = Timestamp.fromDate(date)
      membershipData.updatedAt = Timestamp.fromDate(date)

      // Create a reference to the document with the custom ID
      const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipData.membershipId)
      // Set the data for the document with the custom ID
      await setDoc(membershipRef, membershipData)
      id = membershipRef.id
    })

    // Return success response
    return new ResponseDto(
      ResponseCode.OK,
      'Membership added successfully with custom ID',
      new SuccessResponseDto(membershipData, id)
    )
  } catch (error) {
    console.error('Error adding membership with custom ID:', error)
    return handleMembershipException(error, 'Saving')
  }
}
export const upgradeMembershipIfEligible = async (
  accountId: string,
  transaction: null | Transaction = null
): Promise<ResponseDto> => {
  try {
    // Get the account document to find the user's current membershipPoints and membershipId
    const accountRef = doc(db, CollectionName.ACCOUNTS, accountId)
    const accountDoc = await getDoc(accountRef)
    if (!accountDoc.exists()) {
      throw new NotFoundException('Account does not exist')
    }
    const account = accountDoc.data() as Customer

    // Query to find all memberships ordered by minPoints
    const membershipsRef = collection(db, CollectionName.MEMBERSHIPS)
    const membershipsQuery = query(membershipsRef, orderBy('minPoints', 'asc'))

    // Get all memberships to find the next level
    const membershipsSnapshot = await getDocs(membershipsQuery)
    const memberships = membershipsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Membership)
    }))

    // Find the next membership level
    const currentMembershipIndex = memberships.findIndex(
      (membership) => membership.membershipId === account.membershipId
    )
    const nextMembership = memberships
      .slice(currentMembershipIndex + 1)
      .find((membership) => account.membershipPoints >= membership.minPoints)

    if (nextMembership) {
      // If there's a next level, update the user's membership
      await updateDoc(accountRef, {
        membershipId: nextMembership.id,
        updatedAt: Timestamp.fromDate(new Date()) // Make sure to import Timestamp from firebase/firestore
      })
      // TODO: send notification
      return new ResponseDto(
        ResponseCode.OK,
        'Successfully update membership for member',
        new SuccessResponseDto(null, accountRef.id)
      )
    } else {
      return new ResponseDto(ResponseCode.OK, 'This membership is the highest one', null)
    }
  } catch (err) {
    return handleMembershipException(err, 'Update membership for member')
  }
}

export const getNextHigherMembershipId = async (currentMembershipId: string) => {
  try {
    // Get the current membership document to find its level
    const currentMembershipRef = doc(db, CollectionName.MEMBERSHIPS, currentMembershipId)
    const currentMembershipDoc = await getDoc(currentMembershipRef)
    if (!currentMembershipDoc.exists()) {
      throw new NotFoundException('Current membership does not exist')
    }
    const currentMembership = currentMembershipDoc.data() as Membership

    // Query to find the next higher membership level
    const membershipsRef = collection(db, CollectionName.MEMBERSHIPS)
    const nextMembershipQuery = query(
      membershipsRef,
      where('level', '>', currentMembership.level),
      orderBy('level', 'asc'),
      limit(1)
    )

    const querySnapshot = await getDocs(nextMembershipQuery)
    let finalResult: string = currentMembershipId
    if (!querySnapshot.empty) {
      // If there's a next level, return its ID
      finalResult = querySnapshot.docs[0].id
      return new ResponseDto(
        ResponseCode.OK,
        'Successfully get next membership id',
        new SuccessResponseDto(finalResult, currentMembershipId)
      )
    } else {
      return new ResponseDto(
        ResponseCode.OK,
        'This membership ID is the highest one',
        new SuccessResponseDto(finalResult, currentMembershipId)
      )
    }
  } catch (error) {
    console.error('Error getting next higher membership ID:', error)
    return handleMembershipException(error, 'Get next higher membership ID')
  }
}

export async function updateMembership(membershipId: string, updatedData: Partial<Membership>) {
  try {
    const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipId)
    updatedData.updatedAt = Timestamp.fromDate(new Date())
    await updateDoc(membershipRef, updatedData)

    return new ResponseDto(ResponseCode.OK, 'Membership updated successfully', null)
  } catch (error) {
    console.error('Error updating membership:', error)
    return handleMembershipException(error, 'Updating')
  }
}
export async function deleteMembership(membershipId: string) {
  try {
    const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipId)
    await deleteDoc(membershipRef)

    return new ResponseDto(ResponseCode.OK, 'Membership deleted successfully', null)
  } catch (error) {
    console.error('Error deleting membership:', error)
    return handleMembershipException(error, 'Deleting')
  }
}

export async function getAllMemberships(sortBy: 'updatedDate' | 'minPoints' = 'minPoints', sortOrder: OrderByDirection = 'asc') {
  try {
    const membershipQuery = query(
      collection(db, CollectionName.MEMBERSHIPS),
      orderBy(sortBy, sortOrder)
    );
    const membershipSnapshot = await getDocs(membershipQuery);
    const memberships = membershipSnapshot.docs.map((doc) => doc.data());
    return new ResponseDto(ResponseCode.OK, 'Memberships fetched successfully', memberships);
  } catch (error) {
    console.error('Error fetching memberships:', error);
    return handleMembershipException(error, 'Fetching');
  }
}
