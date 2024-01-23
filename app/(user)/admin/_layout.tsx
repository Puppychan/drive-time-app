import AdminFooter from '@/src/components/footer/AdminFooter'
import Footer from '@/src/components/footer/Footer'
import CircleIcon from '@/src/components/image/CircleIcon'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

    <View style={{ flex: 1 }}>
      {/* Your stack navigator and screens */}
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            // headerShown: false,
            headerTitle: 'Admin Home',
            headerBackVisible: false,
            ...headerCustomStyle
          }}
        />
        <Stack.Screen
          name="users"
          options={{
            // headerShown: false,
            headerTitle: 'User List',
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity>
                <CircleIcon name="add"
                  size={30}
                  color={"#fff"} />

              </TouchableOpacity>
            ),
            ...headerCustomStyle
          }}
        />
        <Stack.Screen
          name="membership"
          options={{
            // headerShown: false,
            headerTitle: 'Membership List',
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity>
                <CircleIcon name="add"
                  size={30}
                  color={"#fff"} />

              </TouchableOpacity>
            ),
            ...headerCustomStyle
          }}
        />
        <Stack.Screen
          name="vouchers"
          options={{
            // headerShown: false,
            headerTitle: 'Voucher List',
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity>
                <CircleIcon name="add"
                  size={30}
                  color={"#fff"} />

              </TouchableOpacity>
            ),
            ...headerCustomStyle
          }}
        />
      </Stack>
      <AdminFooter />
    </View >
  )
}
