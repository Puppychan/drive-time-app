import React, { useEffect, useRef } from 'react';
import { StyleSheet, Platform, StatusBar, Animated, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import MapView from 'react-native-maps';
import YourComponent from './component/LoadingBar';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
