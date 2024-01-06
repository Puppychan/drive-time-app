import { Timestamp } from "firebase/firestore"

export interface Voucher {
    voucherId: string
    name: string
    discountPercent: number
    expireDate: Date
    startDate: Date
    code: string
    generatedByAdmin: string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}