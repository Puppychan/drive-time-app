import { Timestamp } from 'firebase/firestore'

import { TransportType } from './transport.model'
export enum AddtionalApplyType {
  ALL = 'All'
}
export type VoucherApplyType = AddtionalApplyType | TransportType

export interface Voucher {
  voucherId: string
  name: string
  discountPercent: number // in percent %
  expireDate: Date
  startDate: Date
  code: string
  applyType: VoucherApplyType
  generatedByAdmin: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
