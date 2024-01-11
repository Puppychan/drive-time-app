import { Timestamp, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Membership } from '../models/membership.model'

function handleMembershipException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} membership unsuccessfully`,
    `${type} membership unsuccessfully: ${error}`
  )
}

export async function addMembership(membershipData: Membership) {
  try {
    // add created at and updated at
    const date = new Date()
    membershipData.createdAt = Timestamp.fromDate(date)
    membershipData.updatedAt = Timestamp.fromDate(date)

    // Create a reference to the document with the custom ID
    const membershipRef = doc(db, CollectionName.MEMBERSHIPS, membershipData.membershipId)
    // Set the data for the document with the custom ID
    await setDoc(membershipRef, membershipData)

    // Return success response
    return new ResponseDto(
      ResponseCode.OK,
      'Membership added successfully with custom ID',
      new SuccessResponseDto(membershipData, membershipRef.id)
    )
  } catch (error) {
    console.error('Error adding membership with custom ID:', error)
    return handleMembershipException(error, 'Saving')
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
