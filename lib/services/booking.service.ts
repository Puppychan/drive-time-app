import { Timestamp, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

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

    // Retrieve the booking
    const bookingRef = doc(db, CollectionName.BOOKINGS, bookingId)
    const bookingSnapshot = await getDoc(bookingRef)
    if (!bookingSnapshot.exists()) {
      throw new Error('Booking does not exist')
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
        const accountRef = doc(db, CollectionName.ACCOUNTS, customerId)
        const accountSnapshot = await getDoc(accountRef)
        if (accountSnapshot.exists()) {
          // Update the customer's points
          await updateDoc(accountRef, {
            membershipPoints: increment(ADD_MEMBERSHIP_POINT), // This will add the specified points to the existing points
            updatedAt: Timestamp.fromDate(new Date())
          })
        }
      }

      console.log(`Booking ${bookingId} finished and points added to customers`)
      return new ResponseDto(
        ResponseCode.OK,
        'Finish booking successfully',
        new SuccessResponseDto(null, bookingId)
      )
    } else {
      console.log(`Booking ${bookingId} is already finished`)
    }
  } catch (err) {
    console.log('Fail to finish booking', err)
    return handleBookingException(err, 'Finish booking')
  }

  // Commit the transaction or batch if used
}
