import { Timestamp } from 'firebase/firestore'

export interface Chat {
  chatId: string
  driverId: string
  customerId: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
