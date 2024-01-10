import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { createUser } from '../firebase/auth'
import { Review } from '../models/review.model'

const userIdList = ['722281eb-2208-467f-867c-b614897507e6', 'b6d0d9ec-b592-4891-a77d-6c04c351d35d', '272b66fd-9555-45c7-a84d-168f2c9ea63b', 'fc37cc03-dacd-4615-9b0a-69d0e9013eca']

// const generateRandomReviewData = async () => {
//   const reviewId = faker.string.uuid()
//   // randomRole = ReviewRole.Driver
//   // workStartDate = Timestamp.fromDate(new Date())
//   const randomNumber = faker.number.int({ max: 500 })

//   const tempReview: Review = {
//     reviewId,
//     numStars: faker.number.int({min: 1, max: 5})
//     fromUser: 
// details
// toUser
// resolveBy
// from
//     updatedDate: undefined,
//     createdDate: undefined
//   }
//   return tempReview
// }

// export const generateRandomReviews = async (numberOfUsers: number) => {
//   const userCreationPromises = []

//   for (let i = 0; i < numberOfUsers; i++) {
//     const subReview = await generateRandomReviewData()
//     const userPromise = createUser(subReview.email, '1234567', subReview)
//     userCreationPromises.push(userPromise)
//   }

//   try {
//     await Promise.all(userCreationPromises)

//     return 'Successfully added user'
//     // process.exit(0)
//   } catch (error) {
//     return `Error adding user ` + error
//     // process.exit(1)
//   }
// }
