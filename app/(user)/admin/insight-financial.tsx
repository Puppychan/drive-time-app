import { Provider } from 'react-redux'
import {store } from '@/store'
import FinancialInsight from '@/src/screens/admin/FinancialInsight'

export default function Page() {
  return (
    <Provider store={store}>
      <FinancialInsight />
    </Provider>
  )
}
