import {
  DocumentReference,
  Query,
  Timestamp,
  Transaction,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'
import { SortOrder } from '@/common/sort.enum'

import { getAccountById, updateCustomerMembershipPoints } from './account.service'
import { upgradeMembershipIfEligible } from './membership.service'
import {
  getVoucherDetails,
  isAppliedVoucherValid,
  renderNewDiscountPrice,
  revertDiscountPrice
} from './voucher.service'
import { CollectionName } from '../common/collection-name.enum'
import { BadRequestException, NotFoundException } from '../common/handle-error.interface'
import { db } from '../firebase/firebase'
import { Booking, BookingStatus } from '../models/booking.model'

export async function applyVoucherToBooking(bookingId: string, voucherId: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const booking = await getSnapshotData(bookingRef)
    // render driver using id
    const driverResponse = await getAccountById(booking.driverId)

    if (driverResponse.code !== ResponseCode.OK) {
      // error getting driver
      return driverResponse
    }
    // if success
    // get driver body
    const driverData = driverResponse.body.data
    // render voucher
    const voucherResponse = await getVoucherDetails(voucherId)
    // if render voucher details successfully
    if (voucherResponse.code !== ResponseCode.OK) {
      // error getting voucher
      return voucherResponse
    }
    // get voucher body if success
    const voucherData = voucherResponse.body.data
    // validate again: if compact with required type - in case validation in front end provides bugs
    if (isAppliedVoucherValid(driverData.transportType, voucherData)) {
      // Apply voucher to booking
      await updateDoc(bookingRef, {
        voucherId,
        discountPrice: renderNewDiscountPrice(booking.discountPrice, voucherData),
        updatedAt: Timestamp.now()
      })
      console.log(`Voucher applied to booking ${bookingId}`)
    } else {
      throw new BadRequestException('Voucher is not compatible with the driver`s transport type')
    }
  } catch (error) {
    console.error(`Error applying voucher to booking: ${error}`)
    throw error
  }
}

// Add destination to a booking
export async function addDestinationToRide(bookingId: string, newDestination: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    await updateDoc(bookingRef, {
      // TODO: add increase price
      destinationList: arrayUnion(newDestination),
      updatedAt: Timestamp.now()
    })
    return new ResponseDto(
      ResponseCode.OK,
      `Add destination to destination list successfully`,
      null
    )
  } catch (err) {
    return handleBookingException(err, 'Add destination to list')
  }
}

export async function deleteVoucherInBooking(bookingId: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const booking = await getSnapshotData(bookingRef)

    // render voucher
    const currentVoucherResponse = await getVoucherDetails(booking.voucherId)
    // voucher has error -> return
    if (currentVoucherResponse.code !== ResponseCode.OK) return currentVoucherResponse
    const voucherData = currentVoucherResponse.body.data

    // start updating
    await updateDoc(bookingRef, {
      voucherId: null,
      discountPrice: revertDiscountPrice(booking.discountPrice, voucherData),
      updatedAt: Timestamp.now()
    })
    // return result
    console.log(`Voucher removed from booking ${bookingId}`)
    return new ResponseDto(ResponseCode.OK, `Voucher removed from booking ${bookingId}`, null)
  } catch (error) {
    console.error(`Error removing voucher from booking: ${error}`)
    return handleBookingException(error, 'Remove voucher in booking')
  }
}

export async function deleteDestinationInRide(bookingId: string, destination: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const booking = await getSnapshotData(bookingRef)
    // validate current destination ID list
    if (booking.destinationList.length === 1)
      throw new BadRequestException('The destination ID list can`t be empty')
    // start updating
    await updateDoc(bookingRef, {
      destinationList: arrayRemove(destination),
      // TODO: add new price calculation
      updatedAt: Timestamp.now()
    })
    console.log(`Destination ${destination} removed from booking ${bookingId}`)
    return new ResponseDto(
      ResponseCode.OK,
      `Destination ${destination} removed from booking ${bookingId}`,
      null
    )
  } catch (error) {
    console.error(`Error removing destination from booking: ${error}`)
    return handleBookingException(error, 'Remove destination from list in booking')
  }
}

// Add customer to a booking
export async function addCustomerToRide(bookingId: string, newCustomerId: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const booking = await getSnapshotData(bookingRef)
    await updateDoc(bookingRef, {
      customerIdList: arrayUnion(newCustomerId),
      discountPrice: splitBillToCustomer(booking.customerIdList.length + 1, booking.discountPrice),
      updatedAt: Timestamp.now()
    })
    return new ResponseDto(ResponseCode.OK, `Add passenger to passenger list successfully`, null)
  } catch (err) {
    return handleBookingException(err, 'Add passenger to list')
  }
}

export async function deleteCustomerInRide(bookingId: string, customerId: string) {
  try {
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const booking = await getSnapshotData(bookingRef)
    // validate current customer ID list
    if (booking.customerIdList.length === 1)
      throw new BadRequestException('The customer ID list can`t be empty')
    // start updating
    await updateDoc(bookingRef, {
      customerIdList: arrayRemove(customerId),
      discountPrice: splitBillToCustomer(booking.customerIdList.length - 1, booking.discountPrice)
    })
    console.log(`Customer ${customerId} removed from booking ${bookingId}`)
    return new ResponseDto(
      ResponseCode.OK,
      `Passenger ${customerId} removed from booking ${bookingId}`,
      null
    )
  } catch (error) {
    console.error(`Error removing customer from booking: ${error}`)
    return handleBookingException(error, 'Remove passenger from list in booking')
  }
}

export async function addBooking(bookingData: Booking) {
  try {
    // TODO: Find driver algorithm here
    // bookingData.driverId = 'driverId'

    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    bookingData.updatedAt = Timestamp.fromDate(currentDate)
    bookingData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(db, CollectionName.BOOKINGS, bookingData.bookingId)
    // Set the data for the document with the custom ID
    await setDoc(docRef, bookingData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving booking successfully',
      new SuccessResponseDto(bookingData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding booking:', error)
    return handleBookingException(error, 'Saving')
  }
}

export async function getBooking(bookingId: string) {
  try {
    const docRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return new ResponseDto(
        ResponseCode.OK,
        'Render booking successfully',
        new SuccessResponseDto(docSnap.data(), docRef.id)
      )
    } else {
      return new ResponseDto(
        ResponseCode.NOT_FOUND,
        'Booking information is not found',
        `Render booking information from ${bookingId} is not found`
      )
    }
  } catch (error) {
    console.error('Error fetching booking:', error)
    return handleBookingException(error, 'Fetch booking details')
  }
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  callback: Function
) {
  try {
    const transactionResult = await runTransaction(db, async (transaction) => {
      // Retrieve the booking
      const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
      const booking = await getSnapshotData(bookingRef)
      // Check if the booking can be required status
      if (booking.status !== newStatus) {
        // Update the booking status to required status and set updated time
        await updateDoc(bookingRef, {
          status: BookingStatus.Success,
          updatedAt: Timestamp.fromDate(new Date())
        })

        return await callback(transaction, booking)
      } else {
        console.log(`Booking ${bookingId} is already in ${newStatus}`)
        return new ResponseDto(
          ResponseCode.BAD_GATEWAY,
          'Booking status has already been updated before',
          `Booking ${bookingId} is already in ${newStatus}`
        )
      }
    })
    // Check transaction result and prepare the response
    if (transactionResult.error) {
      return new ResponseDto(transactionResult.code, transactionResult.error.message, null)
    }
    return new ResponseDto(
      ResponseCode.OK,
      'Finish booking successfully',
      new SuccessResponseDto(null, bookingId)
    )
  } catch (err) {
    return handleBookingException(err, `Update booking status - ${newStatus}`)
  }
}

export async function cancelBooking(bookingId: string) {
  try {
    return await updateBookingStatus(
      bookingId,
      BookingStatus.Canceled,
      async (transaction: Transaction, booking: Booking) => {
        // Add rollback transaction
      }
    )
  } catch (err) {
    return handleBookingException(err, 'Cancel booking')
  }
}

export async function finishBooking(bookingId: string) {
  try {
    return await updateBookingStatus(
      bookingId,
      BookingStatus.Canceled,
      async (transaction: Transaction, booking: Booking) => {
        // Loop through all customers associated with the booking and add points
        for (const customerId of booking.customerIdList) {
          // update membership points of that customer
          const updateCustomerResponse = await updateCustomerMembershipPoints(
            customerId,
            transaction
          )
          if (updateCustomerResponse.code !== ResponseCode.OK) {
            return {
              error: new Error('Sorry, we are unable to update your membership at this time.'),
              code: updateCustomerResponse.code
            }
          }
          // update customer membership level if enough points
          const membershipResponse = await upgradeMembershipIfEligible(customerId, transaction)
          if (membershipResponse.code !== ResponseCode.OK) {
            return {
              error: new Error('Sorry, we are unable to upgrade your membership at this time.'),
              code: updateCustomerResponse.code
            }
          }
        }

        console.log(`Booking ${bookingId} finished and points added to customers`)
        return { success: true }
      }
    )
  } catch (err) {
    console.log('Fail to finish booking', err)
    return handleBookingException(err, 'Finish booking')
  }
}

// Method implementations...
export async function renderBookingsByStatus(
  status: BookingStatus,
  sortField = 'updatedAt',
  sortOrder = SortOrder.DESC
) {
  try {
    sortField = getValidSortField(sortField)
    const bookingCollection = collection(db, CollectionName.BOOKINGS)
    const q = query(bookingCollection, where('status', '==', status), orderBy(sortField, sortOrder))
    return getQuerySnapshotData(q)
  } catch (error) {
    return handleBookingException(error, 'Render booking list by status')
  }
}

export async function renderBookingsByDriver(
  driverId: string,
  sortField = 'updatedAt',
  sortOrder = SortOrder.DESC
) {
  try {
    sortField = getValidSortField(sortField)
    const bookingCollection = collection(db, CollectionName.BOOKINGS)
    const q = query(
      bookingCollection,
      where('driverId', '==', driverId),
      orderBy(sortField, sortOrder)
    )
    return getQuerySnapshotData(q)
  } catch (err) {
    return handleBookingException(err, `Render booking list using driver ID`)
  }
}

export async function renderBookingsByCustomer(
  customerId: string,
  sortField = 'updatedAt',
  sortOrder = SortOrder.DESC
) {
  try {
    sortField = getValidSortField(sortField)
    const bookingCollection = collection(db, CollectionName.BOOKINGS)
    const q = query(
      bookingCollection,
      where('customerIdList', 'array-contains', customerId),
      orderBy(sortField, sortOrder)
    )
    return getQuerySnapshotData(q)
  } catch (err) {
    return handleBookingException(err, `Render booking list using customer ID`)
  }
}

// ------------------------------------
// Utility method to validate and return the sort field
function getValidSortField(sortField: string) {
  const validSortFields = ['createdAt', 'price', 'updatedAt']
  return validSortFields.includes(sortField) ? sortField : 'updatedAt'
}

// Helper function to execute query and map results
async function getQuerySnapshotData(query: Query) {
  const querySnapshot = await getDocs(query)
  const itemList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return new ResponseDto(
    ResponseCode.OK,
    `Render list of booking successfully`,
    new SuccessResponseDto(itemList, '')
  )
}

async function getSnapshotData(ref: DocumentReference): Promise<Booking> {
  const bookingSnapshot = await getDoc(ref)

  if (!bookingSnapshot.exists()) {
    throw new NotFoundException('Booking not found')
  }

  return bookingSnapshot.data() as Booking
}

function splitBillToCustomer(listLength: number, currentPrice: number) {
  return currentPrice / listLength
}

function handleBookingException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} booking unsuccessfully`,
    `${type} booking unsuccessfully: ${error}`
  )
}
