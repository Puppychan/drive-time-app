import React from 'react'
import { ScrollView, Text } from 'react-native'
import { MessageBubble } from './bubble/msg.bubble.view'
export const ChatMessageView = () => {
  return (
    <ScrollView>
<MessageBubble />
    </ScrollView>
  )
}
