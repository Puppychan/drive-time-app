import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'


import { ChatHeader } from '../components/chat/header/ChatHeader'
import { ChatInputField } from '../components/chat/input/ChatInputField'
import { ChatMessageView } from '../components/chat/message/MessageView'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'
import { db } from '../../lib/firebase/firebase'
import { CollectionName } from '../../lib/common/collection-name.enum'
import { Account } from '../../lib/models/account.model'

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const TEST_CHAT_ID = '12347'

  useEffect(() => {
    // Subscribe to the Firestore collection on component mount
    const collectionRef = collection(db, CollectionName.CHATS)
    const q = query(
      collectionRef,
      where('chatId', '==', TEST_CHAT_ID),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      //Update state with Firestore data
      const chatData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const userData = await getUserAccount(doc.data().user)
          return {
            _id: doc.id,
            text: doc.data().text,
            user: userData as Account,
            createdAt: doc.data().createdAt.toDate(),
            chatId: doc.data().chatId
          }
        })
      )

      setMessages(chatData)
    })

    // Cleanup the listener when the component unmounts or changes
    return () => unsubscribe()
  }, [])

  const getUserAccount = async (userId: string) => {
    try {
      // Assuming you have initialized Firebase with your configuration
      const userCollection = collection(db, 'accounts') // Replace 'accounts' with your actual collection name

      // Use a query to retrieve the user with the specified userId
      const q = query(userCollection, where('_id', '==', userId))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // If there is a matching document, directly access its data
        const userAccountData = querySnapshot.docs[0].data()
        return userAccountData
      } else {
        console.log('User Account not found for userId:', userId)
        return null
      }
    } catch (error) {
      console.error('Error fetching user account:', error)
      throw error // You might want to handle the error according to your application's needs
    }
  }

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    // Update state with the new messages
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))

    const { _id, createdAt, text, user, chatId } = newMessages[0]

    //Add new message to Firestore
    try {
      const docRef = await addDoc(collection(db, CollectionName.CHATS), {
        id: _id.toString(), // Convert to string if needed
        createdAt,
        text,
        user: user._id.toString(),
        chatId: TEST_CHAT_ID
      })

      // If you need the ID of the newly added document, you can log it
      console.log('Document added with ID: ', docRef.id)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }, [])

  return (
    <View style={{ flex: 1, height: 500, width: 400 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 'yl0w9YyAxxfiqwPlYcyADItMVJt2'
        }}
      />
    </View>
  )
}
export default ChatScreen
