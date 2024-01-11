import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Voucher } from '../models/voucher.model'

function handleVoucherException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} voucher unsuccessfully`,
    `${type} voucher unsuccessfully: ${error}`
  )
}

export async function addVoucher(voucherData: Voucher) {
  try {
    // find if admin exist
    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    voucherData.updatedAt = Timestamp.fromDate(currentDate)
    voucherData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(db, CollectionName.VOUCHERS, voucherData.voucherId)
    // Set the data for the document with the custom ID
    await setDoc(docRef, voucherData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving voucher successfully',
      new SuccessResponseDto(voucherData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding voucher:', error)
    return handleVoucherException(error, 'Saving')
  }
}