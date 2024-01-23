import { View } from 'react-native'
import UserInsight from '@/src/screens/admin/UserInsight'
import { Provider } from 'react-redux'
import {store } from '@/store'

export default function Page() {
  return (
    <Provider store={store}>
      <UserInsight />
    </Provider>
  )
}
