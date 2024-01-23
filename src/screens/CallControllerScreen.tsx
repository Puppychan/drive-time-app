import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, PermissionsAndroid, Platform } from 'react-native'

import { CallScreen } from './CallScreen'
import { HomeScreen } from './HomeCallScreen'

export const CallControllerScreen = () => {
  const [activeScreen, setActiveScreen] = useState('home')
  const goToCallScreen = () => setActiveScreen('call-screen')
  const goToHomeScreen = () => setActiveScreen('home')

  useEffect(() => {
    const run = async () => {
      if (Platform.OS === 'android') {
        const permissionsResult = await PermissionsAndroid.requestMultiple([
          'android.permission.POST_NOTIFICATIONS',
          'android.permission.BLUETOOTH_CONNECT',
          'android.permission.CAMERA',
          'android.permission.RECORD_AUDIO'
        ])

        console.log('Permissions Result:', permissionsResult)
      }
    }

    run()
  }, [])

  return (
    // 5. Wrap your app with the StreamVideo component
    <SafeAreaView style={styles.container}>
      {activeScreen === 'call-screen' ? (
        <CallScreen goToHomeScreen={goToHomeScreen} />
      ) : (
        <HomeScreen goToCallScreen={goToCallScreen} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
})
