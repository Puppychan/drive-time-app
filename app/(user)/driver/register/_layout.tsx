import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/components/Colors'
import { Slot } from 'expo-router'

export default function Layout() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Slot />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy_black,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20
  }
})
