import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { customerIdList, driverIdList, locationIdList } from '../common/id-list.constant'
import { Booking, BookingStatus } from '../models/booking.model'
import { addBooking } from '../services/booking.service'

const generateRandomBookingData = () => {
  const bookingId = faker.string.uuid()
  const uniqueCustomerIdList = []
  const uniqueDestinationIdList = []
  console.log('Before adding booking customer list')
  const endCustomerLength = faker.number.int({ min: 1, max: 3 })
  // Populate uniqueCustomerIdList with random customer IDs
  for (let index = 0; index < endCustomerLength; index++) {
    uniqueCustomerIdList.push(
      customerIdList[faker.number.int({ min: index * 2, max: index * 2 + 1 })]
    )
  }
  console.log('Before adding booking destination list')
  const departure = locationIdList[faker.number.int({ min: 0, max: locationIdList.length - 1 })]
  const endDestinationsLength = faker.number.int({ min: 1, max: 3 })
  let currentLocationId = ''
  for (let index = 0; index < endDestinationsLength; index++) {
    do {
      currentLocationId = locationIdList[faker.number.int({ min: index * 2, max: index * 2 + 1 })]
    } while (currentLocationId === departure)
    uniqueDestinationIdList.push(currentLocationId)
  }

  const price = parseFloat(faker.commerce.price())
  console.log('Creating booking info')
  const tempBooking: Booking = {
    bookingId,
    customerIdList: uniqueCustomerIdList,
    driverId: driverIdList[faker.number.int({ min: 0, max: driverIdList.length - 1 })],
    preScheduleTime: faker.datatype.boolean() ? Timestamp.fromDate(faker.date.past()) : null,
    price,
    discountPrice: price,
    voucherId: null,
    departure,
    destinationList: uniqueDestinationIdList,
    status: faker.datatype.boolean() ? BookingStatus.Success : BookingStatus.Canceled,
    createdAt: undefined,
    updatedAt: undefined
  }
  return tempBooking
}
export const generateRandomBookings = async (count: number) => {
  const bookingCreationPromises = []

  for (let i = 0; i < count; i++) {
    const booking = generateRandomBookingData()
    const bookingPromise = addBooking(booking)
    bookingCreationPromises.push(bookingPromise)
  }

  try {
    await Promise.all(bookingCreationPromises)

    return 'Successfully added booking'
    // process.exit(0)
  } catch (error) {
    return `Error adding booking ` + error
    // process.exit(1)
  }
}
