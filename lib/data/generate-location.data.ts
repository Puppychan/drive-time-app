import { faker } from '@faker-js/faker'

// Lat & Long for Vietnam
const minLatitude = 8.18
const maxLatitude = 23.39
const minLongitude = 102.14
const maxLongitude = 109.46

export const generateRandomLocation = (count: number) => {
  const locationId = faker.string.uuid()
  const latitude = faker.location.latitude({ max: maxLatitude, min: minLatitude })
  const longitude = faker.location.longitude({ max: maxLongitude, min: minLongitude })

  return {
    locationId,
    latitude,
    longitude
  }
}
