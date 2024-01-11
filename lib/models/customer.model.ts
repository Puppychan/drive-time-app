import { Account } from './account.model'

export interface Customer extends Account {
  description: string
  membershipId: string
  membershipPoints: number
}
