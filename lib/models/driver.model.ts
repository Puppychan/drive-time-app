import { GeoPoint, Timestamp } from 'firebase/firestore'

import { Account } from './account.model'
import { Transport } from './transport.model'

export interface Driver extends Account {
  workStartDate: Timestamp
  isBan: boolean
  transport: Transport | null
  banTime?: Timestamp | null
  location?: GeoPoint
  isAvailable?: boolean
}
