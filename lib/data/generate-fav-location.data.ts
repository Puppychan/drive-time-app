import { faker } from '@faker-js/faker'

enum FavLocationCategory {
  Personal = 'Personal',
  Business = 'Business'
}

export const generateRandomFavLocation = (accountId: string, locationId: string) => {
  const favLocationId = faker.string.uuid()
  const name = faker.lorem.words({ min: 1, max: 5 })
  const type = getRandomEnumValue(FavLocationCategory)

  return {
    favLocationId,
    name,
    type
  }
}

const getRandomEnumValue = (enumObject: any) => {
  const enumValues = Object.values(enumObject)
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

// Gen 5 fav location
const favLocations = Array.from({ length: 5 }, () => generateRandomFavLocation('1', '2'))
