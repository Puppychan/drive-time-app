import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Favourite from '../Screens/Favourite'
import Direction from '../Screens/Direction'
import { CustomFooter } from './CustomFooter'

const Tab = createBottomTabNavigator()

const Footer = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomFooter {...props}/>}>
      <Tab.Group
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen options={{ tabBarLabel: 'Home' }} name="Home" component={Home} />
        <Tab.Screen options={{ tabBarLabel: 'Profile' }} name="Profile" component={Profile} />
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
