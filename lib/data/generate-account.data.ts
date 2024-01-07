/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { AccountType } from '../common/model-type'
import { createUser } from '../firebase/auth'
import { Account, AccountRole, accountRoleList } from '../models/account.model'

const generateRandomAccountData = async () => {
  const accountId = faker.string.uuid()
  const birthday = Timestamp.fromDate(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))

  const randomRole = accountRoleList[faker.number.int({ min: 0, max: accountRoleList.length - 1 })]
  let workStartDate: Timestamp
  // generate work start date for admin and driver
  if (randomRole !== AccountRole.Customer) {
    workStartDate = Timestamp.fromDate(
      faker.date.between({ from: birthday.toDate(), to: new Date() })
    )
  } else {
    workStartDate = Timestamp.fromDate(new Date())
  }
  const randomNumber = faker.number.int({ max: 500 })

  const tempAccount: Account = {
    userId: accountId,
    username: `TestUser${randomNumber}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatar(),
    email: `user${randomNumber}@mail.com`,
    phone: faker.phone.number(),
    birthday,
    role: randomRole,
    updatedDate: undefined,
    createdDate: undefined
  }

  let subAccount: AccountType

  switch (randomRole) {
    case AccountRole.Customer:
      subAccount = {
        ...tempAccount,
        description: faker.lorem.paragraphs()
      }
      break
    case AccountRole.Driver:
      subAccount = {
        ...tempAccount,
        workStartDate,
        QRCode: '',
        isBan: false,
        banTime: undefined
      }
      break
    case AccountRole.Admin:
      subAccount = {
        ...tempAccount,
        workStartDate
      }
      break
  }
  return subAccount
}

export const generateRandomAccounts = async (numberOfUsers: number) => {
  const userCreationPromises = []

  for (let i = 0; i < numberOfUsers; i++) {
    const subAccount = await generateRandomAccountData()
    const userPromise = createUser(subAccount.email, '1234567', subAccount)
    userCreationPromises.push(userPromise)
  }

  try {
    const promiseResult = await Promise.all(userCreationPromises)
    console.log(promiseResult)
    process.exit(0)
  } catch (error) {
    console.error('Error creating users:', error)
    process.exit(1)
  }
}

generateRandomAccounts(2) // Generate 10 users
