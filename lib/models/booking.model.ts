import { Timestamp } from 'firebase/firestore'

export enum BookingStatus {
  Finding = 'Finding',
  Tracking = 'Tracking',
  InProgress = 'In Progress',
  Canceled = 'Canceled',
  Success = 'Success'
}

export const bookingStatusList = [
  BookingStatus.Finding,
  BookingStatus.Tracking,
  BookingStatus.InProgress,
  BookingStatus.Canceled,
  BookingStatus.Success
]

export interface Booking {
  bookingId: string
  customerIdList: string[]
  driverId: string
  preScheduleTime: Timestamp | null // if null: no pre-schedule
  price: number
  discountPrice: number
  voucherId: string | null
  departure: string
  destinationList: string[]
  status: BookingStatus
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
