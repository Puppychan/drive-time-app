import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Review } from '../models/review.model'

function handleReviewException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} review unsuccessfully`,
    `${type} review unsuccessfully: ${error}`
  )
}

export async function addReview(reviewData: Review) {
  try {
    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    reviewData.updatedAt = Timestamp.fromDate(currentDate)
    reviewData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(db, CollectionName.REVIEWS, reviewData.reviewId)
    // Set the data for the document with the custom ID
    await setDoc(docRef, reviewData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving review successfully',
      new SuccessResponseDto(reviewData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding review:', error)
    return handleReviewException(error, 'Saving')
  }
}
