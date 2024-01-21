import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { collection, getDocs, addDoc, doc, getDoc, query, where } from 'firebase/firestore'

import { ChatHeader } from '../components/chat/header/ChatHeader'
import { ChatInputField } from '../components/chat/input/ChatInputField'
import { ChatMessageView } from '../components/chat/message/MessageView'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'
import { db } from '@/lib/firebase/firebase'

export type Chat = {
  id: string
  members: string[]
  createdAt: number
}

export type Message = {
  id: string
  chatId?: string
  content: string
  senderId: string
  senderName: string
  createdAt: number
}

export const ChatScreen = () => {
  const testChatId = 'test-chat-id'

  const [loading, setLoading] = useState(true)
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      // Fetch chat
      const chatDoc = doc(db, 'chats', testChatId)
      const chatSnapshot = await getDoc(chatDoc)
      const chatData = chatSnapshot.data() as Chat
      setChat(chatData)

      // Fetch messages filtered by chat
      const messagesQuery = query(collection(db, 'messages'), where('chatId', '==', testChatId))
      const messagesSnapshot = await getDocs(messagesQuery)
      const fetchedMessages = messagesSnapshot.docs.map((doc) => doc.data())
      setMessages(fetchedMessages.reverse() as Message[])

      setLoading(false)
    }

    fetchChatAndMessages()
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
