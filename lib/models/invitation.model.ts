import { Timestamp } from 'firebase/firestore'

export enum InvitationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Expired = 'Expired'
}

export enum InvitationType {
  FindDriver = 'FindDriver',
  FindShareRide = 'FindShareRide'
}

export interface Invitation {
  invitationId: string
  fromUser: string
  toUser: string
  type: InvitationType
  status: InvitationStatus
  createdAt?: Timestamp
}
