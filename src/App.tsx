import React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'

import { UserProfileView } from './components/user/profile/profile.view'

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <UserProfileView />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
