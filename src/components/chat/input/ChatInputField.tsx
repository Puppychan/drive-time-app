import React, { useState } from 'react'
import { TextInput, View, Image, TouchableOpacity } from 'react-native'
import { auth } from '@/lib/firebase/firebase'
import { Message } from '@/src/screens/ChatScreen'
import { styles } from './chat-input-style'

interface ChatInputFieldProps {
  chatId: string
  onSent: (message: Message) => void
}

export const ChatInputField: React.FC<ChatInputFieldProps> = ({ chatId, onSent }) => {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() === '') return // prevent sending empty messages

    const message: Message = {
      id: Math.random().toString(36),
      chatId,
      content: input,
      senderId: auth.currentUser?.uid || '',
      senderName: auth.currentUser?.displayName || '',
      createdAt: new Date().getTime()
    }

    if (!message.id || !message.content || !message.senderId || !message.createdAt) {
      console.error('Invalid message', message)
      return
    }

    if (!message.senderName) {
      // console.warn('No sender name')
    }

    onSent(message)
    setInput('')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.utilBtn1} source={require('../../../../assets/ic_plus.png')} />
      </TouchableOpacity>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type something..."
        style={styles.input}
        placeholderTextColor="gray"
        onSubmitEditing={handleSend} // send message when user presses enter
      />

      <TouchableOpacity onPress={handleSend}>
        <Image style={styles.utilBtn2} source={require('../../../../assets/ic_send.png')} />
      </TouchableOpacity>
    </View>
  )
}
