import { Timestamp } from "firebase/firestore"
import { User } from "react-native-gifted-chat"

export interface Message {
    messageId: string
    user: string
    chatId: string
    text: string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}