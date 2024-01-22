import Footer from '@/src/components/footer/Footer'
import { Stack } from 'expo-router'
import { StyleProp, View } from 'react-native'

const headerCustomStyle = {
  headerStyle: {
    backgroundColor: 'black',

  },
  headerTitleStyle: {
    color: 'white'
  }
}

export default function _layout() {
  return (

    <View style={{ flex: 1 }}>
      {/* Your stack navigator and screens */}
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerBackVisible: false,
            headerTitle: "Home Drive Time",
            ...headerCustomStyle
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

      </Stack>

      {/* Your reusable Footer component */}
      <Footer />
    </View >
  )
}