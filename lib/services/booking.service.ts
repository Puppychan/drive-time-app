import {
  Timestamp,
  doc,
  getDoc,
  increment,
  runTransaction,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { updateCustomerMembership } from './account.service'
import { updateMembership, upgradeMembershipIfEligible } from './membership.service'
import { CollectionName } from '../common/collection-name.enum'
import { ADD_MEMBERSHIP_POINT } from '../common/membership.constant'
import { db } from '../firebase/firebase'
import { Booking, BookingStatus } from '../models/booking.model'

function handleBookingException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} booking unsuccessfully`,
    `${type} booking unsuccessfully: ${error}`
  )
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

export async function finishBooking(bookingId: string) {
  try {
    // Begin a transaction or batch if necessary for atomic operations
    const transactionResult = await runTransaction(db, async (transaction) => {
      // Retrieve the booking
      const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
      const bookingSnapshot = await getDoc(bookingRef)
      if (!bookingSnapshot.exists()) {
        return { error: new Error('Booking does not exist'), code: 404 }
      }
      const booking = bookingSnapshot.data() as Booking

      // Check if the booking can be finished
      if (booking.status !== BookingStatus.Success) {
        // Update the booking status to finished and set updated time
        await updateDoc(bookingRef, {
          status: BookingStatus.Success,
          updatedAt: Timestamp.fromDate(new Date())
        })

        // Loop through all customers associated with the booking and add points
        for (const customerId of booking.customerIdList) {
          const updateCustomerResponse = await updateCustomerMembership(customerId)
          if (updateCustomerResponse.code !== ResponseCode.OK) {
            return {
              error: new Error('Sorry, we are unable to update your membership at this time.'),
              code: 500
            }
          }
          const membershipResponse = await upgradeMembershipIfEligible(customerId)
          if (membershipResponse.code !== ResponseCode.OK) {
            return {
              error: new Error('Sorry, we are unable to upgrade your membership at this time.'),
              code: 500
            }
          }
        }

        console.log(`Booking ${bookingId} finished and points added to customers`)
        return { success: true }
      } else {
        console.log(`Booking ${bookingId} is already finished`)
        return { error: new Error('Booking is already finished') }
      }
    })

    // Check transaction result and prepare the response
    if (transactionResult.error) {
      return new ResponseDto(ResponseCode.code, transactionResult.error.message, null)
    }
    return new ResponseDto(
      ResponseCode.OK,
      'Finish booking successfully',
      new SuccessResponseDto(null, bookingId)
    )
  } catch (err) {
    console.log('Fail to finish booking', err)
    return handleBookingException(err, 'Finish booking')
  }
}
