import { faker } from '@faker-js/faker'
import { Timestamp, collection, getDocs, query, updateDoc, where, doc } from 'firebase/firestore'

import { AccountType } from '../common/model-type'
import { createUser } from '../firebase/auth'
import { Account, AccountRole, accountRoleList } from '../models/account.model'
import { db } from '../firebase/firebase'
import { CollectionName } from '../common/collection-name.enum'

const generateRandomAccountData = async (type: AccountRole | null) => {
  console.log('Starting create account data')
  const accountId = faker.string.uuid()
  const birthday = Timestamp.fromDate(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))

  let workStartDate: Timestamp
  let randomRole
  if (type == null)
    randomRole = accountRoleList[faker.number.int({ min: 0, max: accountRoleList.length - 1 })]
  else randomRole = type
  // generate work start date for admin and driver
  if (randomRole !== AccountRole.Customer) {
    workStartDate = Timestamp.fromDate(
      faker.date.between({ from: birthday.toDate(), to: new Date() })
    )
  } else {
    workStartDate = Timestamp.fromDate(new Date())
  }
  // randomRole = AccountRole.Driver
  // workStartDate = Timestamp.fromDate(new Date())
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
        membershipId: '1',
        membershipPoints: 0,
        description: faker.lorem.paragraphs(),
        customerStripeId: ''
      }
      break
    case AccountRole.Driver:
      subAccount = {
        ...tempAccount,
        workStartDate,
        isBan: false,
        banTime: null,
        transport: null
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

export const generateRandomAccounts = async (
  numberOfUsers: number,
  type: AccountRole | null = null
) => {
  const userCreationPromises = []

  for (let i = 0; i < numberOfUsers; i++) {
    const subAccount = await generateRandomAccountData(type)
    const userPromise = createUser(subAccount.email, '1234567', subAccount)
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
export async function addCustomerStripeId() {
  try {
    const accountsCollection = collection(db, CollectionName.ACCOUNTS);
  const q = query(accountsCollection, where('role', '==', AccountRole.Customer));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((customerDoc) => {
    const customerRef = doc(db, CollectionName.ACCOUNTS, customerDoc.id)
    console.log("Customer ID", customerDoc.id);
    updateDoc(
      customerRef,
      {customerStripeId: ''}
    );
  });
  } catch (err) {
    console.log("Error updating customer stripe id list", err);
  }
}