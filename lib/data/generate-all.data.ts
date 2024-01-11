import { ToastAndroid } from 'react-native'

import { generateRandomAccounts } from './generate-account.data'
import { generateRandomFavoriteLocations } from './generate-fav-location.data'
import { generateRandomLocations } from './generate-location.data'
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
  //   generateRandomAccounts(10).then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.SHORT)
  //     console.log('Successfully ', message)
  //   })

  // generate voucher
  // generateRandomVouchers().then((message) => {
  //   ToastAndroid.show(message, ToastAndroid.LONG)
  //   console.log('Voucher', message)
  // })

  // generate location
  //   generateRandomLocations(10).then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.LONG)
  //     console.log('Location', message)
  //   })

  // generate favorite location
  console.log("Ciosnfosdklnfds");
  generateRandomFavoriteLocations().then((message) => {
    ToastAndroid.show(message, ToastAndroid.LONG)
    console.log('Favourite Location', message)
  })
}
