import {
  DocumentData,
  DocumentSnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  orderBy,
  OrderByDirection
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { NotFoundException } from '../common/handle-error.interface'
import { db } from '../firebase/firebase'
import { TransportType } from '../models/transport.model'
import { Voucher, AddtionalApplyType } from '../models/voucher.model'

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

export async function getVoucherDetails(voucherId: string | null | undefined) {
  try {
    // if voucher id is falsy -> does not exist
    if (!voucherId) throw new NotFoundException('Voucher not found')
    // start finding
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

export function isAppliedVoucherValid(transportType: TransportType, voucher: Voucher) {
  // validate voucher apply type valid
  const voucherType = voucher.applyType
  if (!(!voucherType || voucherType === AddtionalApplyType.ALL || voucherType === transportType))
    return false

  // validate voucher expire or started
  const expirationDate = voucher.expireDate.toDate();
  const startDate = voucher.startDate.toDate();
  const currentDate = new Date();
  if (currentDate >= expirationDate || currentDate <= startDate) return false

  return true
}

export function renderNewDiscountPrice(currentPrice: number, currentVoucher: Voucher) {
  // TODO: add validate month package later

  return currentPrice * ((100 - currentVoucher.discountPercent) / 100)
}

export function revertDiscountPrice(discountedPrice: number, currentVoucher: Voucher) {
  if (currentVoucher.discountPercent === 0) {
    // Avoid division by zero
    return discountedPrice
  }

  // TODO: add validate month package later

  // Calculate the original price before discount
  return discountedPrice / ((100 - currentVoucher.discountPercent) / 100)
}

export const fetchVouchers = async (filter = {}, sortField = 'updatedAt', sortOrder: OrderByDirection = 'asc') => {
  try {
    const vouchersCollection = collection(db, CollectionName.VOUCHERS);
    let q = query(vouchersCollection);

    // Apply the filter to the query
    for (const [key, value] of Object.entries(filter)) {
      q = query(q, where(key, "==", value));
    }
    // Apply the sort to the query
    // if (sortField) {
    //   q = query(q, orderBy(sortField, sortOrder));
    // }

    const querySnapshot = await getDocs(q);


    const vouchersList: Voucher[] = [];
    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
      const voucherData = { id: doc.id, ...(doc.data() as Voucher) };
      vouchersList.push(voucherData);
    });

    return new ResponseDto(
      ResponseCode.OK,
      'Render voucher list successfully',
      new SuccessResponseDto(vouchersList, '')
    );
  } catch (error) {
    return handleVoucherException(error, 'Fetching voucher list');
  }
}

export const fetchVouchersInActiveState = async (filter = {}, sortField = 'updatedAt', sortOrder: OrderByDirection = 'asc') => {
  try {
    const vouchersCollection = collection(db, CollectionName.VOUCHERS);
    const currentDate = Timestamp.now();
    let q = query(vouchersCollection, where("expireDate", ">", currentDate));

    // Apply the filter to the query
    for (const [key, value] of Object.entries(filter)) {
      if (value)
        q = query(q, where(key, "==", value));
    }

    // Apply the sort to the query
    // if (sortField) {
    //   q = query(q, orderBy(sortField, sortOrder));
    // }

    const querySnapshot = await getDocs(q);

    const vouchersList: Voucher[] = [];
    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
      const voucherData = { id: doc.id, ...(doc.data() as Voucher) };
      if (voucherData.startDate < currentDate) {
        vouchersList.push(voucherData);
      }
    });

    return new ResponseDto(
      ResponseCode.OK,
      'Render voucher list successfully',
      new SuccessResponseDto(vouchersList, '')
    );
  } catch (error) {
    console.log('Fetch voucher list', error);
    return handleVoucherException(error, 'Fetching voucher list');
  }
}
