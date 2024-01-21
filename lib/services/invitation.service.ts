import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  onValue,
  serverTimestamp,
  update
} from 'firebase/database'
import { InvitationStatus, InvitationType } from '../models/invitation.model'
import { CollectionName } from '../common/collection-name.enum'

const database = getDatabase()

export const sendInvitation = (
  senderId: string,
  receiverId: string,
  type = InvitationType.FindShareRide
) => {
  const invitation = {
    sender: senderId,
    receiver: receiverId,
    status: InvitationStatus.Pending,
    type,
    timestamp: serverTimestamp()
  }
  push(ref(database, CollectionName.INVITATIONS), invitation)
}

export const listenForInvitations = (userId: string, setInvitations) => {
  const invitationQuery = query(
    ref(database, CollectionName.INVITATIONS),
    orderByChild('receiver'),
    equalTo(userId)
  )
  return onValue(invitationQuery, (snapshot) => {
    const invitationsData = []
    snapshot.forEach((childSnapshot) => {
      invitationsData.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    setInvitations(invitationsData)
  })
}

export const respondToInvitation = (invitationId: string, response) => {
  update(ref(database, `invitations/${invitationId}`), { status: response })
}
