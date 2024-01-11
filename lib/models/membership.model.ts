import { Timestamp } from 'firebase/firestore'

export interface Membership {
  membershipId: string
  name: string
  level: number
  minPoints: number
  discount: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
