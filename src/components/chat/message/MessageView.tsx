import React from 'react'
import { ScrollView } from 'react-native'
import { MessageBubble } from './bubble/MessageBubble'
import { Message } from '@/src/screens/ChatScreen'

interface ChatMessageViewProps {
  messages: Message[]
}

export const ChatMessageView: React.FC<ChatMessageViewProps> = ({ messages }) => {
  return (
    <ScrollView>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </ScrollView>
  )
}
