import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { Location } from '../models/location.model'

function handleLocationException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} location unsuccessfully`,
    `${type} location unsuccessfully: ${error}`
  )
}

export async function addLocation(locationData: Location) {
  try {
    // find if admin exist
    const currentDate = new Date()
    // Add createdAt and updatedAt timestamps
    locationData.updatedAt = Timestamp.fromDate(currentDate)
    locationData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(db, CollectionName.LOCATIONS, locationData.locationId)
    // Set the data for the document with the custom ID
    await setDoc(docRef, locationData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving location successfully',
      new SuccessResponseDto(locationData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding location:', error)
    return handleLocationException(error, 'Saving')
  }
}
