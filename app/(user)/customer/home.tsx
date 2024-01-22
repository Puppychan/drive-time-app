import { useRouter } from 'expo-router'

import HomeScreen from '@/src/screens/HomeScreen'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import {store } from '@/store'
export default function Page() {
  return (
    <Provider store={store}>

      <HomeScreen />
    </Provider>
  )
}
