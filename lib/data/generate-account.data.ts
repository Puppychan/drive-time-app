/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { createUser } from '../firebase/auth'
import { AccountType } from '../model-type'
import { Account, AccountRole, accountRoleList } from '../models/account.model'

const generateRandomAccountData = () => {
  const createdDate = Timestamp.fromDate(new Date())
  const birthday = Timestamp.fromDate(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))
  const workStartDate = Timestamp.fromDate(
    faker.date.between({ from: birthday.toDate(), to: new Date() })
  )

  const randomRole = accountRoleList[faker.number.int({ min: 0, max: accountRoleList.length - 1 })]

  const tempAccount: Account = {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    updatedDate: createdDate,
    createdDate,
    birthday,
    role: randomRole
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
        QRCode: faker.image.imageUrl(),
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
    const subAccount = generateRandomAccountData()
    const userPromise = createUser(subAccount.email, '1234567', subAccount)
    userCreationPromises.push(userPromise)
  }

  try {
    await Promise.all(userCreationPromises)
    console.log(`${numberOfUsers} users created successfully.`)
  } catch (error) {
    console.error('Error creating users:', error)
  }
}

const dummyUsers = generateRandomAccounts(10) // Generate 10 users
