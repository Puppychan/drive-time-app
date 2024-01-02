// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { GooglePlacesInput } from 'src/GooglePlacesInput'
import { SignInScreen } from 'src/SignInScreen'

import { MapScreen } from './MapScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // Hide the header for all screens in the navigator
      }}
    >
      <Stack.Screen name="GooglePlacesInput" component={GooglePlacesInput} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator
