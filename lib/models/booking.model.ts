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
  customerId: string
  bookingTime: Timestamp
  price: number
  driverId: string
  voucherId?: string
  departure: string
  status: BookingStatus
  createdAt: Timestamp
  updatedAt: Timestamp
}
