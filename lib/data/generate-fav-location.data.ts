import { faker } from '@faker-js/faker'

import { customerIdList, locationIdList } from '../common/id-list.constant'
import { FavoriteLocation, FavoriteLocationType } from '../models/favorite-location.model'
import { addFavoriteLocation } from '../services/favourite-location.service'

const FAVOURITE_LIST = [
  {
    name: 'Home',
    type: FavoriteLocationType.Personal
  },
  {
    name: 'Cafe',
    type: FavoriteLocationType.Personal
  },
  {
    name: 'Work',
    type: FavoriteLocationType.Business
  }
]

const generateRandomFavLocation = (accountId: string) => {
  const favoriteList = []
  for (let index = 0; index < 3; index++) {
    const favoriteLocationId = faker.string.uuid()
    const name = FAVOURITE_LIST[index].name
    const type = FAVOURITE_LIST[index].type

    const location: FavoriteLocation = {
      favoriteLocationId,
      accountId,
      locationId: locationIdList[index],
      name,
      type,
      createdAt: undefined,
      updatedAt: undefined
    }
    favoriteList[index] = location
  }
  return favoriteList
}
export const generateRandomFavoriteLocations = async () => {
  const favoriteLocationCreationPromises = []
  const totalFavoriteList: FavoriteLocation[] = []
  try {
    for (let index = 0; index < 2; index++) {
      totalFavoriteList.push(...generateRandomFavLocation(customerIdList[index]))
    }

    for (let i = 0; i < totalFavoriteList.length; i++) {
      const favoriteLocationPromise = addFavoriteLocation(totalFavoriteList[i])
      favoriteLocationCreationPromises.push(favoriteLocationPromise)
    }

    await Promise.all(favoriteLocationCreationPromises)

    return 'Successfully added favorite location'
    // process.exit(0)
  } catch (error) {
    return `Error adding favorite location ` + error
    // process.exit(1)
  }
}
