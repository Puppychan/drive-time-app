import Footer from '@/src/components/footer/Footer'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function _layout() {
  return (

    <View style={{ flex: 1 }}>
      {/* Your stack navigator and screens */}
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false
          }}
        />
        
      </Stack>

      {/* Your reusable Footer component */}
      <Footer />
    </View >
  )
}
