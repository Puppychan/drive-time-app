import { Timestamp } from 'firebase/firestore'

export interface RecentSearch {
  searchId: string
  accountId: string
  content: string
  createdAt: Timestamp
}
