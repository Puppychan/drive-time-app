import { faker } from '@faker-js/faker'

// Voucher atleast 1 days and max 1 year
const minDaysDifference = 1
const maxDaysDifference = 365
const randomDaysDifference =
  minDaysDifference + Math.random() * (maxDaysDifference - minDaysDifference)

export const generateRandomVoucherData = (superUserId: string) => {
  const voucherId = faker.string.uuid()
  const name = faker.lorem.words({ min: 2, max: 5 })
  const discountPercent = faker.number.float({ min: 1, max: 100 })
  const startDate = faker.date.recent()

  const expireDate = new Date(startDate)
  expireDate.setDate(startDate.getDate() + randomDaysDifference)

  // 6 digits code
  const code = faker.number.int({ min: 100000, max: 999999 })

  return {
    voucherId,
    name,
    discountPercent,
    startDate,
    expireDate,
    code
  }
}

// Gen 5 vouchers
const vouchers = Array.from({ length: 5 }, () => generateRandomVoucherData('1'))
