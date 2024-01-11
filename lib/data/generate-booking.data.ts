import { faker } from '@faker-js/faker'

import { Booking } from '../models/booking.model'
import { customerIdList } from '../common/id-list.constant'
import { Timestamp } from 'firebase/firestore'


const generateRandomBookingData = async () => {
  const bookingId = faker.string.uuid()
  const customerId = customerIdList[faker.number.int({ min: 0, max: customer.length - 1 })]
  const tempBooking: Booking = {
    bookingTime: Timestamp.fromDate(faker.date.past()),
    price: parseFloat(faker.commerce.price()),
    voucherId: null,
    departure: faker.address.cityName(),
    status: getRandomBookingStatus(),
    createdAt: new Date(), // Replace with your Timestamp format
    updatedAt: new Date() // Replace with your Timestamp format
  }
}

export const generateRandomBookings = async (numberOfUsers: number) => {
  const userCreationPromises = []

  for (let i = 0; i < numberOfUsers; i++) {
    const subBooking = await generateRandomBookingData()
    const userPromise = createUser(subBooking.email, '1234567', subBooking)
    userCreationPromises.push(userPromise)
  }

  try {
    await Promise.all(userCreationPromises)

    return 'Successfully added user'
    // process.exit(0)
  } catch (error) {
    return `Error adding user ` + error
    // process.exit(1)
  }
}
