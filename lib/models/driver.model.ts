import { Timestamp } from 'firebase/firestore'

import { Account } from './account.model'

export interface Driver extends Account {
  workStartDate: Timestamp
  QRCode: string
  isBan: boolean
  banTime: Timestamp
}
