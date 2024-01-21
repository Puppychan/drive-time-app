import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { NotFoundException } from '../common/handle-error.interface'
import { db } from '../firebase/firebase'
import { Voucher, VoucherApplyType, AddtionalApplyType } from '../models/voucher.model'
import { Transport } from '../models/transport.model'

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

export async function getVoucherDetails(voucherId: string) {
  try {
    const voucherRef = doc(db, CollectionName.VOUCHERS, voucherId)
    const voucherSnapshot = await getDoc(voucherRef)

    if (!voucherSnapshot.exists()) {
      throw new NotFoundException('Voucher not found')
    }

    const voucherDetails = voucherSnapshot.data()
    return new ResponseDto(
      ResponseCode.OK,
      `Voucher found`,
      new SuccessResponseDto(voucherDetails, voucherRef.id)
    )
  } catch (error) {
    console.error(`Error retrieving voucher: ${error}`)
    return handleVoucherException(error, 'Get voucher details')
  }
}

export function isVoucherCompatibleWithTransport(
  transportType: Transport,
  voucherType: VoucherApplyType | null | undefined
) {
  if (!voucherType || voucherType == AddtionalApplyType.ALL || voucherType == transportType)
}
