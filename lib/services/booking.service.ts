// import { Booking } from "../models/booking.model"

// export async function addBooking(bookingData: Booking) {
//   try {
//     const currentDate = new Date()
//     // Add createdAt and updatedAt timestamps
//     bookingData.updatedAt = Timestamp.fromDate(currentDate)
//     bookingData.createdAt = Timestamp.fromDate(currentDate)

//     // Add the booking to the 'bookings' collection
//     const docRef = await addDoc(collection(db, CollectionName.REVIEWS), bookingData)

//     return new ResponseDto(
//       ResponseCode.OK,
//       'Saving booking successfully',
//       new SuccessResponseDto(bookingData, docRef.id)
//     )
//   } catch (error) {
//     console.error('Error adding booking:', error)
//     return handleBookingException(error)
//   }
// }
