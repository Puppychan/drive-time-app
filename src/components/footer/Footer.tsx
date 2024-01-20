import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { UserProfileScreen } from '@/src/screens/ProfileScreen'

import { CustomFooter } from './CustomFooter'
import Direction from '../../screens/DirectionScreen'
import Favourite from '../../screens/FavouriteScreen'
import Home from '../../screens/HomeScreen'

const Tab = createBottomTabNavigator()

const Footer = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomFooter {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen options={{ tabBarLabel: 'Home' }} name="Home" component={Home} />
        <Tab.Screen
          options={{ tabBarLabel: 'Profile' }}
          name="Profile"
          component={UserProfileScreen}
        />
        <Tab.Screen options={{ tabBarLabel: 'Favourite' }} name="Favourite" component={Favourite} />
        <Tab.Screen options={{ tabBarLabel: 'Direction' }} name="Direction" component={Direction} />
      </Tab.Group>
    </Tab.Navigator>
  )
}
export default Footer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff'
  }
})
