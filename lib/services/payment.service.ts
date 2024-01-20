import axios from 'axios'

const apiUrl = 'http://13.211.134.29:3000'

export const StripePaymentIntent = async (requestBody: object) => {
  try {
    const response = await axios.post(`${apiUrl}/payments/intent`, requestBody)
    return response.data
  } catch (error) {
    console.error('Error initializing Payment Intent:', error)
  }
}

export const StripeUserPaymentMethod = async (requestBody: object) => {
  try {
    const response = await axios.post(`${apiUrl}/payments/get-payment-method`, requestBody)
    return response.data
  } catch (error) {
    console.error('Error initializing Payment Intent:', error)
  }
}