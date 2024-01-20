import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import { GooglePlacesInput } from '@/src/screens/GooglePlacesInputScreen'
import { store } from '@/store'
import { VoucherScreen } from '@/src/screens/VoucherScreen'

export default function Page() {
  const router = useRouter()

  return (
    <View>
      {/* <Provider store={store}>
        <GooglePlacesInput />
      </Provider> */}
      <VoucherScreen/>
    </View>
  )
}
