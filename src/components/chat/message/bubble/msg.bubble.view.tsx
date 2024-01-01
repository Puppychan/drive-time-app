import React from 'react'
import { Text, View } from 'react-native'

import { styles } from './msg.bubble.style'

interface MessageBubbleProps {
  content: string
  sender: number
  createdTime: number
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, sender, createdTime }) => {
  const isSender1 = sender !== 1

  return (
    <View>
      <View style={[styles.messageContainer, isSender1 ? styles.sender1 : styles.sender2]}>
        <Text style={isSender1 ? styles.sender1Text : styles.sender2Text}>{content}</Text>
      </View>
      <Text style={[styles.sentTime, isSender1 ? styles.sender1Time : styles.sender2Time]}>
        Sent 10:21
      </Text>
    </View>
  )
}
