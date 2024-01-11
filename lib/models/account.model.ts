import { Timestamp } from 'firebase/firestore'

export enum AccountRole {
  Customer = 'Customer',
  Driver = 'Driver',
  Admin = 'Admin'
}

export const accountRoleList = [AccountRole.Admin, AccountRole.Driver, AccountRole.Customer]

export interface Account {
  _id: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
  email?: string
  phone?: string
  updatedDate?: Timestamp // add after create account
  createdDate?: Timestamp // add after create account
  birthday?: Timestamp
  role?: AccountRole
  // address - can be optional because sometimes user doesn't have address
  locationId?: string // This field is optional as denoted by '?'
}
