// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack'

import { GooglePlacesInput } from '@/src/screens/GooglePlacesInputScreen'
import { SignInScreen } from '@/src/screens/SignInScreen'

import HomeScreen from './screens/HomeScreen'
import { MapScreen } from './screens/MapScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false // Hide the header for all screens in the navigator
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GooglePlacesInput" component={GooglePlacesInput} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator
