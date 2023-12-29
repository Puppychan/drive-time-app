import Entypo from '@expo/vector-icons/Entypo'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'

import { UserProfileView } from './src/components/user/profile/profile.view'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts + Apis
        await Font.loadAsync(Entypo.font)
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
      <UserProfileView />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
