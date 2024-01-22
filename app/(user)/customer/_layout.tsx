import Footer from '@/src/components/footer/Footer'
import { store } from '@/store'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { Provider } from 'react-redux'

const headerCustomStyle = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerTintColor: 'white' // This will change the color of the back button
}

export default function _layout() {
  return (
    <Provider store={store}>


      <View style={{ flex: 1 }}>
        {/* Your stack navigator and screens */}
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerBackVisible: false,
              headerTitle: "Home Drive Time",
              ...headerCustomStyle,
            }}
          />
          <Stack.Screen
            name="voucher"
            options={{
              headerBackVisible: false,
              headerTitle: "Voucher List",
              ...headerCustomStyle
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerBackVisible: false,
              headerTitle: "Profile",
              ...headerCustomStyle
            }}
          />
          <Stack.Screen
            name="nearby_place"
            options={{
              headerTitle: "Nearby Place",
              ...headerCustomStyle
            }}
          />

        </Stack>

        {/* Your reusable Footer component */}
        <Footer />
      </View >
    </Provider>
  )
}