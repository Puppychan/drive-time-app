import { Timestamp } from 'firebase/firestore'

import { Account } from './account.model'
import { Transport } from './transport.model'

export interface Driver extends Account {
  workStartDate: Timestamp
  isBan: boolean
  banTime: Timestamp | null
  transport: Transport | null
}
