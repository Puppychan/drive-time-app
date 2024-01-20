import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { FavoriteLocation } from '../models/favorite-location.model'

function handleFavoriteLocationException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} favourite location unsuccessfully`,
    `${type} favourite location unsuccessfully: ${error}`
  )
}

export async function addFavoriteLocation(favouriteLocationData: FavoriteLocation) {
  try {
    // find if admin exist
    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    favouriteLocationData.updatedAt = Timestamp.fromDate(currentDate)
    favouriteLocationData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(
      db,
      CollectionName.FAVOURITE_LOCATIONS,
      favouriteLocationData.favoriteLocationId
    )
    // Set the data for the document with the custom ID
    await setDoc(docRef, favouriteLocationData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving favourite location successfully',
      new SuccessResponseDto(favouriteLocationData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding favourite location:', error)
    return handleFavoriteLocationException(error, 'Saving')
  }
}
