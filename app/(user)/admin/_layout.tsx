import FooterAdmin from '@/src/components/footer/FooterAdmin'
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
          name="insight-user"
          options={{
            title: 'Insight User',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="insight-finacial"
          options={{
            title: 'Insight Finance',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="insight-service"
          options={{
            title: 'Insight Services',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            headerShown: true
          }}
        />
        
      </Stack>

      <FooterAdmin />
    </View >
  )
}
