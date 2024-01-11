import { Timestamp, doc, setDoc } from 'firebase/firestore'

import { ResponseCode } from '@/common/response-code.enum'
import { SuccessResponseDto } from '@/common/response-success.dto'
import { ResponseDto } from '@/common/response.dto'

import { CollectionName } from '../common/collection-name.enum'
import { db } from '../firebase/firebase'
import { RecentSearch } from '../models/recent-search.model'

function handleRecentSearchException(error: any, type: string) {
  const errorCode = error?.code
  return new ResponseDto(
    errorCode ?? ResponseCode.BAD_GATEWAY,
    `${type} recent search unsuccessfully`,
    `${type} recent search unsuccessfully: ${error}`
  )
}

export async function addRecentSearch(recentSearchData: RecentSearch) {
  try {
    // find if admin exist
    const currentDate = new Date()
    // Add createdAt and timestamps
    recentSearchData.createdAt = Timestamp.fromDate(currentDate)

    // Create a reference to the document with the custom ID
    const docRef = doc(db, CollectionName.RECENT_SEARCHES, recentSearchData.searchId)
    // Set the data for the document with the custom ID
    await setDoc(docRef, recentSearchData)

    return new ResponseDto(
      ResponseCode.OK,
      'Saving recent search successfully',
      new SuccessResponseDto(recentSearchData, docRef.id)
    )
  } catch (error) {
    console.error('Error adding recent search:', error)
    return handleRecentSearchException(error, 'Saving')
  }
}
