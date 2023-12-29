import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native'

import { ProfileHeaderView } from './components/user/profile/header/header.view'
import { ProfileRoundedButton } from './components/user/profile/utilBtn/utilBtn'

import { UserProfileView } from './components/user/profile/profile.view'
import { SafetyBtn } from './components/user/profile/safety/safety.view'
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SafetyBtn />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
