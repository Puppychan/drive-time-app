import { View } from 'react-native'
import { Provider } from 'react-redux'

import { GooglePlacesInput } from '@/src/screens/GooglePlacesInputScreen'
import { store } from '@/store'

export default function Page() {

  return (
    <View>
      <Provider store={store}>
        <GooglePlacesInput />
      </Provider>
    </View>
  )
}
