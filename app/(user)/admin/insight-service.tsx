import { View } from 'react-native'
import { Provider } from 'react-redux'
import {store } from '@/store'
import ServiceInsight from '@/src/screens/admin/ServiceInsight'

export default function Page() {
  return (
    <Provider store={store}>
      <ServiceInsight />
    </Provider>
  )
}
