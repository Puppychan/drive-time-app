// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { GooglePlacesInput } from 'src/GooglePlacesInput'
import { SignInScreen } from 'src/SignInScreen'

import { MapScreen } from './MapScreen'
import HomePage from './HomePage'

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
