import { ToastAndroid } from 'react-native'

import { generateRandomAccounts } from './generate-account.data'
import { generateMembershipData } from './generate-membership.data'
import { generateRandomVouchers } from './generate-voucher.data'
import { AccountRole } from '../models/account.model'

export function generateData() {
  // generate membership
  //   generateMembershipData().then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.LONG)
  //     console.log('Membership', message)
  //   })

  // generate accounts
  generateRandomAccounts(10).then((message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
    console.log('Successfully ', message)
  })

  // generate voucher
  //   generateRandomVouchers().then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.LONG)
  //     console.log('Voucher', message)
  //   })
}
