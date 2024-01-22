import { ToastAndroid } from 'react-native'

import { addCustomerStripeId, generateRandomAccounts } from './generate-account.data'
import { generateRandomBookings } from './generate-booking.data'
import { generateRandomFavoriteLocations } from './generate-fav-location.data'
import { generateRandomLocations } from './generate-location.data'
import { generateMembershipData } from './generate-membership.data'
import { generateRandomVouchers } from './generate-voucher.data'
import { AccountRole } from '../models/account.model'
import { updateAllDriverAccountsToBeTrueRandomly, updateAllDriverAccountsTransport } from './update-driver.data'

export function generateData() {
  // generate membership
  //   generateMembershipData().then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.LONG)
  //     console.log('Membership', message)
  //   })

  // generate accounts
  // generateRandomAccounts(3, AccountRole.Customer).then((message) => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT)
  //   console.log('Successfully ', message)
  // })

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
  //   generateRandomFavoriteLocations().then((message) => {
  //     ToastAndroid.show(message, ToastAndroid.LONG)
  //     console.log('Favourite Location', message)
  //   })

  // generate booking
  // generateRandomBookings(5).then((message) => {
  //   ToastAndroid.show(message, ToastAndroid.LONG)
  //   console.log('Booking', message)
  // })

  // update driver
  // updateAllDriverAccountsTransport().then((message) => {
  //   ToastAndroid.show(`Done updating drivers`, ToastAndroid.LONG)
  //   console.log('Done updating drivers', message)
  // }).catch(err => {
  //   ToastAndroid.show(`Error updating drivers`, ToastAndroid.LONG)
  //   console.log('Error updating drivers', err)
  // })

  // update driver status
  // updateAllDriverAccountsToBeTrueRandomly().then((message) => {
  //   ToastAndroid.show(`Done updating drivers`, ToastAndroid.LONG)
  //   console.log('Done updating drivers', message)
  // }).catch(err => {
  //   ToastAndroid.show(`Error updating drivers`, ToastAndroid.LONG)
  //   console.log('Error updating drivers', err)
  // })

  // update customer stripe id
  // addCustomerStripeId().then((mess) => {
  //   ToastAndroid.show(`Done updating customer stripe id`, ToastAndroid.SHORT)
  //   console.log(`Done updating customer stripe id`);
  // }) .catch(err => {
  //   ToastAndroid.show(`Error updating customer stripe id`, ToastAndroid.SHORT)
  //   console.log(`Error updating customer stripe id`);
  // })
}
