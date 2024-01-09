import { Timestamp, addDoc, collection } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Review } from '../models/review.model'

function handleReviewException(error: any) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    'Saving review unsuccessfully',
    `Saving review unsuccessfully: ${error}`
  )
}

async function addReview(reviewData: Review) {
  try {
    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    reviewData.updatedAt = Timestamp.fromDate(currentDate)
    reviewData.createdAt = Timestamp.fromDate(currentDate)

    // Add the review to the 'reviews' collection
    const docRef = await addDoc(collection(db, CollectionName.REVIEWS), reviewData)

    console.log('Review added with ID:', docRef.id)
    return new ResponseDto(ResponseCode.OK, 'Saving review successfully', {
      data: reviewData,
      docId: docRef.id
    })
  } catch (error) {
    console.error('Error adding review:', error)
    return handleReviewException(error)
  }
}
