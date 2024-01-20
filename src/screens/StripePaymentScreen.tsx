import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native'

import { StripePaymentIntent, StripeUserPaymentMethod } from '@/lib/services/payment.service'

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51OZSSiJPx7rQ3VEwkLAPlP8cQGg5wSpSATi3XYmshpbtRECUeW0JAhntQ3jy30fuBAcYH7wl1K1pM2m5LBjteXaU00px9UD5jV'

export const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const handlePaymentPress = async () => {
    try {
      const amount = 3000 // in pennies

      const customerStripeId = 'cus_POHmXEYB56m3tg'
      const paymentMethodList = StripeUserPaymentMethod({ customerStripeId })

      const { paymentIntent, ephemeralKey, customer } = await StripePaymentIntent({
        amount,
        customerStripeId,
        paymentMethodList
      })

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
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handlePaymentPress}>
          <Text style={styles.buttonText}>Make Payment</Text>
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})