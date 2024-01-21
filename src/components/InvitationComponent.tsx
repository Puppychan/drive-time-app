import { auth } from '@/lib/firebase/firebase'
import {
  listenForInvitations,
  respondToInvitation,
  sendInvitation
} from '@/lib/services/invitation.service'
import { Unsubscribe } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'

const currentUser = auth.currentUser
const InvitationComponent = ({ receiverId }) => {
  const [invitations, setInvitations] = useState([])
  if (!currentUser) return null

  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (currentUser) unsubscribe = listenForInvitations(currentUser?.uid, setInvitations)
    return () => unsubscribe()
  }, [])

  const handleSendInvitation = (receiverId) => {
    sendInvitation(currentUser.uid, receiverId)
  }

  const handleRespondToInvitation = (invitationId, response) => {
    respondToInvitation(invitationId, response)
  }

  return (
    <View>
      {/* UI to send an invitation */}
      {/* Example button for sending an invitation, replace with actual UI */}
      <Button title="Send Invitation" onPress={() => handleSendInvitation('receiver-id')} />

      {/* UI for incoming invitations */}
      {invitations.map((invitation) => (
        <View key={invitation.id}>
          <Text>Invitation from: {invitation.sender}</Text>
          <Button
            title="Accept"
            onPress={() => handleRespondToInvitation(invitation.id, 'accepted')}
          />
          <Button
            title="Decline"
            onPress={() => handleRespondToInvitation(invitation.id, 'declined')}
          />
        </View>
      ))}
    </View>
  )
}

export default InvitationComponent
