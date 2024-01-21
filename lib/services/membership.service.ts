import {
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
  updateDoc,
  where
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { updateCustomersWithMemberships } from './account.service'
import { CollectionName } from '../common/collection-name.enum'
import { BadRequestException, NotFoundException } from '../common/handle-error.interface'
import { db } from '../firebase/firebase'
import { AccountRole } from '../models/account.model'
import { Customer } from '../models/customer.model'
import { Membership } from '../models/membership.model'

function handleMembershipException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} membership unsuccessfully`,
    `${type} membership unsuccessfully: ${error}`
  )
}

export async function addMembership(membershipData: Membership): Promise<ResponseDto> {
  const membershipId = ''

  try {
    await runTransaction(db, async (transaction) => {
      // Add created at and updated at timestamps
      const date = new Date()
      membershipData.createdAt = Timestamp.fromDate(date)
      membershipData.updatedAt = Timestamp.fromDate(date)

      // Create a reference to the document with the custom ID
      const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipData.membershipId)

      // Set the data for the document with the custom ID
      transaction.set(membershipRef, membershipData)
    })

    // Retrieve list of all current memberships
    const membershipsSnapshot = await getDocs(collection(db, CollectionName.MEMBERSHIPS))
    const memberships = membershipsSnapshot.docs.map((doc) => doc.data() as Membership)

    // Update customers based on the new list of memberships
    const updateCustomerResponse = await updateCustomersWithMemberships(memberships)
    if (updateCustomerResponse.code !== ResponseCode.OK) {
      return updateCustomerResponse
    }

    // Return success response
    return new ResponseDto(
      ResponseCode.OK,
      'Membership added and customers updated successfully',
      new SuccessResponseDto(membershipData, membershipId)
    )
  } catch (error) {
    console.error('Error adding membership and updating customers:', error)
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

export async function updateMembership(
  membershipId: string,
  membershipData: Membership
): Promise<ResponseDto> {
  try {
    await runTransaction(db, async (transaction) => {
      const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipId)
      // Update the updatedAt timestamp
      membershipData.updatedAt = Timestamp.fromDate(new Date())

      // Update the membership document with new data
      transaction.update(membershipRef, membershipData as { [key: string]: any })
    })

    // Retrieve list of all current memberships
    const membershipsSnapshot = await getDocs(collection(db, CollectionName.MEMBERSHIPS))
    const memberships = membershipsSnapshot.docs.map((doc) => doc.data() as Membership)

    // Update customers based on the new list of memberships
    const updateCustomerResponse = await updateCustomersWithMemberships(memberships)
    if (updateCustomerResponse.code !== ResponseCode.OK) {
      return updateCustomerResponse
    }

    // Return success response
    return new ResponseDto(
      ResponseCode.OK,
      'Membership updated and customers updated successfully',
      new SuccessResponseDto(membershipData, membershipId)
    )
  } catch (error) {
    console.error('Error updating membership and updating customers:', error)
    return handleMembershipException(error, 'Updating')
  }
}

export async function deleteMembership(membershipId: string) {
  try {
    // Query to check if any customers have the membershipId
    const customersWithMembership = query(
      collection(db, CollectionName.ACCOUNTS), // Assuming 'customers' is the name of your customers collection
      where('role', '==', AccountRole.Customer),
      where('membershipId', '==', membershipId) // Adjust the field if necessary
    )

    // Get documents based on query
    const querySnapshot = await getDocs(customersWithMembership)

    // Check if customers are associated with the membership
    if (querySnapshot.empty) {
      // No customers found, safe to delete membership
      const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipId)
      await deleteDoc(membershipRef)

      console.log('Membership deleted successfully')
      return new ResponseDto(ResponseCode.OK, 'Membership deleted successfully', null)
    } else {
      // Customers found, throw an error or handle accordingly
      console.error('Error: Cannot delete membership as customers are associated with it.')
      return new BadRequestException(
        'Cannot delete membership as customers are associated with it.'
      )
    }
  } catch (error) {
    console.error('Error deleting membership:', error)
    return handleMembershipException(error, 'Deleting')
  }
}
