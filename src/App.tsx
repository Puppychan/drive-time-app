import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';

import { SignInScreen } from 'src/SignInScreen'; // Adjust the import path
import {GooglePlacesInput} from 'src/GooglePlacesInput';
import { Provider } from 'react-redux';
import { store } from 'store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
