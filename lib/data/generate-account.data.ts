/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { createUser } from '../firebase/auth'
import { AccountType } from '../common/model-type'
import { Account, AccountRole, accountRoleList } from '../models/account.model'
import { uploadQRCodeToStorage } from '../services/account.service'

const generateRandomAccountData = async () => {
  const accountId = faker.string.uuid()
  const createdDate = Timestamp.fromDate(new Date())
  const birthday = Timestamp.fromDate(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))

  const randomRole = accountRoleList[faker.number.int({ min: 0, max: accountRoleList.length - 1 })]
  let workStartDate: Timestamp, qrCode: string
  // generate work start date for admin and driver
  if (randomRole !== AccountRole.Customer) {
    workStartDate = Timestamp.fromDate(
      faker.date.between({ from: birthday.toDate(), to: new Date() })
    )
  } else {
    workStartDate = Timestamp.fromDate(new Date())
  }
  // generate QR code for driver
  if (randomRole === AccountRole.Driver) {
    qrCode = await uploadQRCodeToStorage(faker.string.uuid())
  } else {
    qrCode = ''
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
    await Promise.all(userCreationPromises)
  } catch (error) {
    console.error('Error creating users:', error)
  }
}

const dummyUsers = generateRandomAccounts(2) // Generate 10 users
