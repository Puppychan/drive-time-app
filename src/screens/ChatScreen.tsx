import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { collection, getDocs, addDoc } from 'firebase/firestore'

import { ChatHeader } from '../components/chat/header/ChatHeader'
import { ChatInputField } from '../components/chat/input/ChatInputField'
import { ChatMessageView } from '../components/chat/message/MessageView'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'
import { db } from '@/lib/firebase/firebase'

export type Chat = {
  id: string
  name: string
  members: string[]
}

export type Message = {
  id: string
  content: string
  senderId: string
  senderName: string
  createdAt: number
}

export const ChatScreen = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, 'messages')
      const snapshot = await getDocs(messagesCollection)
      const fetchedMessages = snapshot.docs.map((doc) => doc.data())
      setMessages(fetchedMessages.reverse() as Message[])
      setLoading(false)
    }

    fetchMessages()
  }, [])

  const onSent = async (message: Message) => {
    console.log('onSent', message)
    const messagesCollection = collection(db, 'messages')
    await addDoc(messagesCollection, message)
    setMessages((prevMessages) => [...prevMessages, message])
  }

  if (loading) {
    return (
      <View style={{ height: '100%', marginTop: 100 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={{ height: '100%' }}>
      <ChatHeader />
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={2} />
      </View>
      <ChatMessageView messages={messages} />
      <ChatInputField onSent={onSent} />
    </View>
  )
}
