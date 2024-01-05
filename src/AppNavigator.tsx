// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack'

import { GooglePlacesInput } from '@/src/screens/GooglePlacesInputScreen'
import { SignInScreen } from '@/src/screens/SignInScreen'

import { MapScreen } from './screens/MapScreen'
import HomePage from '../components/HomePage'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false // Hide the header for all screens in the navigator
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="GooglePlacesInput" component={GooglePlacesInput} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator
