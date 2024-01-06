import { Timestamp } from "firebase/firestore"

export interface Message {
    messageId: string
    participantId: string
    chatId: string
    content: string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}