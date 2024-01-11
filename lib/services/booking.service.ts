import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Booking } from '../models/booking.model'

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
    const docRef = doc(db, CollectionName.REVIEWS, bookingData.bookingId)
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
