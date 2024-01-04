import { Timestamp } from 'firebase/firestore'

import { Account } from './account.model'

export interface Admin extends Account {
  workStartDate: Timestamp
}
