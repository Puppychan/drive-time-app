import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { VOUCHERS_LIST } from './../common/vouchers.constant'
import { AddtionalApplyType, Voucher } from './../models/voucher.model'
import { adminIdList } from '../common/id-list.constant'
import { addVoucher } from '../services/voucher.service'

// Voucher atleast 1 days and max 1 year
const minDaysDifference = 1
const maxDaysDifference = 365
const randomDaysDifference =
  minDaysDifference + Math.random() * (maxDaysDifference - minDaysDifference)

export const generateRandomVoucherData = () => {
  const voucherList = VOUCHERS_LIST.map((voucher) => {
    const voucherId = faker.string.uuid()
    const startDate = faker.date.recent()
    // const expireDate = new Date(startDate.getDate() + randomDaysDifference)
    const expireDate = faker.date.future()
    const currentDate = new Date()

    const tempVoucher: Voucher = {
      voucherId,
      name: voucher.name,
      discountPercent: voucher.discountPercent,
      startDate: Timestamp.fromDate(startDate),
      expireDate: Timestamp.fromDate(expireDate),
      code: voucher.code,
      applyType: AddtionalApplyType.ALL,
      generatedByAdmin: adminIdList[faker.number.int({ min: 0, max: adminIdList.length - 1 })],
      createdAt: Timestamp.fromDate(currentDate),
      updatedAt: Timestamp.fromDate(currentDate),
    }
    return tempVoucher
  })

  return voucherList
}
export const generateRandomVouchers = async () => {
  const voucherCreationPromises = []
  const voucherList = generateRandomVoucherData()

  for (let i = 0; i < VOUCHERS_LIST.length; i++) {
    const voucherPromise = addVoucher(voucherList[i])
    voucherCreationPromises.push(voucherPromise)
  }

  try {
    await Promise.all(voucherCreationPromises)

    return 'Successfully added voucher'
    // process.exit(0)
  } catch (error) {
    return `Error adding voucher ` + error
    // process.exit(1)
  }
}
