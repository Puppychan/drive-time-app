import { Timestamp } from 'firebase/firestore'

export enum ReviewFrom {
  Customer = 'Customer',
  Driver = 'Driver'
}

export const reviewRoleList = [ReviewFrom.Customer, ReviewFrom.Driver]
export interface Review {
  reviewId: string
  numStars: number
  details: string
  fromUser: string
  toUser: string
  resolveBy: string
  from: ReviewFrom
  bookingId: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
