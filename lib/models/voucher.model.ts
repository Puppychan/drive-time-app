import { Timestamp } from 'firebase/firestore'

import { TransportType } from './transport.model'
export enum AddtionalApplyType {
  ALL = 'All'
}
export type VoucherApplyType = AddtionalApplyType | TransportType

export const voucherFilterMap = {
  'applyType': [AddtionalApplyType.ALL, TransportType.Car4_VIP, TransportType.Car4, TransportType.Car7],
}

export interface Voucher {
  voucherId: string
  name: string
  discountPercent: number // in percent %
  expireDate: Timestamp
  startDate: Timestamp
  code: string
  applyType: VoucherApplyType
  generatedByAdmin: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
