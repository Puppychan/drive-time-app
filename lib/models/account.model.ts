import { Timestamp } from 'firebase/firestore'
import { SOS } from './sos.model'

export enum AccountRole {
  Customer = 'Customer',
  Driver = 'Driver',
  Admin = 'Admin'
}

export const accountRoleList = [AccountRole.Admin, AccountRole.Driver, AccountRole.Customer]


export interface Account {
  userId: string
  username: string
  firstName: string
  lastName: string
  avatar?: string | null
  email: string
  phone: string
  updatedDate?: Timestamp // add after create account
  createdDate?: Timestamp // add after create account
  birthday?: Timestamp | null
  role: string
  // address - can be optional because sometimes user doesn't have address
  locationId?: string // This field is optional as denoted by '?'
  // device token - list of device token - can be optional because sometimes user doesn't have device token
  deviceTokenList?: string[],
  sos?: SOS

}
