import { View } from 'react-native'

import AdminDashboard from '@/src/screens/admin/AdminDashboard'
import { Provider } from 'react-redux'
import { store } from '@/store'
export default function Page() {
  return (
    <Provider store={store}>
      <AdminDashboard />
    </Provider>
  )
}
