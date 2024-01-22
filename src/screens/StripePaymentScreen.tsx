import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { StyleSheet, TouchableOpacity, View, Text, Alert, ToastAndroid } from 'react-native'

import { StripePaymentIntent, StripeUserPaymentMethod } from '@/lib/services/payment.service'
import { getCustomerStripeId, setCustomerStripeId } from '@/lib/services/account.service'
import { auth } from '@/lib/firebase/firebase'
import { ResponseCode } from '@/common/response-code.enum'
import { useEffect } from 'react'

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51OZSSiJPx7rQ3VEwkLAPlP8cQGg5wSpSATi3XYmshpbtRECUeW0JAhntQ3jy30fuBAcYH7wl1K1pM2m5LBjteXaU00px9UD5jV'

export const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const handlePaymentPress = async () => {
    try {
      const amount = 3000 // in pennies

      // render customer stripe id using current user ID
      const userId = auth.currentUser?.uid ?? ''
      // const customerStripeId = 'cus_POHmXEYB56m3tg'
      const getStripeIdResponse = await getCustomerStripeId(userId)
      // if render unsuccessful
      if (getStripeIdResponse.code !== ResponseCode.OK) {
        ToastAndroid.show(getStripeIdResponse.message ?? 'Cannot fetch customer stripe id', ToastAndroid.LONG)
        return;
      }
      let customerStripeId = getStripeIdResponse.body.data
      const paymentMethodList = StripeUserPaymentMethod({ customerStripeId })

      const { paymentIntent, ephemeralKey, customer } = await StripePaymentIntent({
        amount,
        customerStripeId,
        paymentMethodList
      })

      // compare customerStripeID == customer => nothing: update
      if (customerStripeId != customer) {
        customerStripeId = customer
        const updateStripeIdResponse = await setCustomerStripeId(userId, customer)
        if (updateStripeIdResponse.code !== ResponseCode.OK) {
          ToastAndroid.show(getStripeIdResponse.message ?? 'Cannot update customer stripe id', ToastAndroid.LONG)
          return;
        }
      }

      if (!paymentIntent) {
        Alert.alert('Payment Error', 'Please try again after a few seconds')
        return
      }

      // Show payment sheet
      const paymentSheet = await initPaymentSheet({
        merchantDisplayName: 'DriveTime',
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer
      })

      if (!paymentSheet) {
        Alert.alert('Payment Error', 'Could not show payment sheet. Please try again.')
        return
      }

      const paymentResponse = await presentPaymentSheet()

      if (paymentResponse.error) {
        Alert.alert('Payment Error', 'Could not complete payment. Please try again.')
        return
      }

      // Done payment
      Alert.alert('System Alert', 'Payment successfully')
    } catch (error) {
      // Handle the payment error
      console.error('Payment Error:', error)
    }
  }

  useEffect(() => {
    handlePaymentPress()
  }, [])

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <TouchableOpacity className='bg-black flex-1 px-4 w-full py-2 rounded-lg' onPress={handlePaymentPress}>
          <Text className='text-lg text-white text-center w-full' style={{ fontWeight: '900' }}>Make payment</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
