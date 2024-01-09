import { Timestamp } from 'firebase/firestore'

import { Account } from './account.model'
import { Transport } from './transport.model'

export interface Driver extends Account {
  workStartDate: Timestamp
  QRCode: string
  isBan: boolean
  banTime: Timestamp
  transport: Transport
}
