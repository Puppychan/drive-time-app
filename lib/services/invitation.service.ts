import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Invitation, InvitationStatus, InvitationType } from '../models/invitation.model'

function handleInvitationException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} invitation unsuccessfully`,
    `${type} invitation unsuccessfully: ${error}`
  )
}

// Function to send an invitation
export async function sendInvitation(fromUserId: string, toUserId: string, type: InvitationType) {
  try {
    const invitation = {
      fromUser: fromUserId,
      toUser: toUserId,
      status: InvitationStatus.Pending, // initial status
      type,
      createdAt: Timestamp.fromDate(new Date())
    } as Invitation
    const docRef = await addDoc(collection(db, CollectionName.INVITATIONS), invitation)
    return new ResponseDto(
      ResponseCode.OK,
      'Sending invitation successfully',
      new SuccessResponseDto(invitation, docRef.id)
    )
  } catch (error) {
    return handleInvitationException(error, 'Sending with ' + type)
  }
}

// Function to accept an invitation
async function updateInvitationStatus(invitationId: string, updateStatus: InvitationStatus) {
  const invitationRef = doc(db, CollectionName.INVITATIONS, invitationId)
  await updateDoc(invitationRef, {
    status: updateStatus
  })
}

export async function acceptInvitation(invitationId: string) {
  await updateInvitationStatus(invitationId, InvitationStatus.Accepted)
}

export async function rejectInvitation(invitationId: string) {
  await updateInvitationStatus(invitationId, InvitationStatus.Rejected)
}

export async function markInvitationExpire(invitationId: string) {
  await updateInvitationStatus(invitationId, InvitationStatus.Expired)
}
