// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {SignInScreen} from 'src/SignInScreen';
import {GooglePlacesInput} from 'src/GooglePlacesInput';
import {MapScreen} from './MapScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false, // Hide the header for all screens in the navigator
      }}
    >
      <Stack.Screen name="GooglePlacesInput" component={GooglePlacesInput} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
