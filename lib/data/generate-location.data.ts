import { faker } from '@faker-js/faker'
import { GeoPoint } from 'firebase/firestore'

import { Location } from '../models/location.model'
import { addLocation } from '../services/location.service'

// Lat & Long for Vietnam
const minLatitude = 8.18
const maxLatitude = 23.39
const minLongitude = 102.14
const maxLongitude = 109.46

const generateRandomLocationData = () => {
  const locationId = faker.string.uuid()
  const latitude = faker.location.latitude({ max: maxLatitude, min: minLatitude })
  const longitude = faker.location.longitude({ max: maxLongitude, min: minLongitude })

  const location: Location = {
    locationId,
    geoLocation: new GeoPoint(latitude, longitude),
    createdAt: undefined,
    updatedAt: undefined
  }
  return location
}

export const generateRandomLocations = async (count: number) => {
  const locationCreationPromises = []

  for (let i = 0; i < count; i++) {
    const location = generateRandomLocationData()
    const locationPromise = addLocation(location)
    locationCreationPromises.push(locationPromise)
  }

  try {
    await Promise.all(locationCreationPromises)

    return 'Successfully added location'
    // process.exit(0)
  } catch (error) {
    return `Error adding location ` + error
    // process.exit(1)
  }
}
