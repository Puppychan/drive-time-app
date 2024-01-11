import { Timestamp } from 'firebase/firestore'

export interface RecentSearch {
  searchId: string
  content: string
  createdAt: Timestamp
}
