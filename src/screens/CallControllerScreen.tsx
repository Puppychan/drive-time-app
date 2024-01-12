import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, PermissionsAndroid, Platform } from 'react-native'

import { CallScreen } from './CallScreen'
import { HomeScreen } from './HomeCallScreen'

const apiKey = 'jpenjjsk4773'
const userId_1 = 'Quoc_123'
const userId_2 = 'Quoc_456'
const callId = 'test_call_ring'

// JWT
const token_1 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUXVvY18xMjMifQ.hVpyEKnZaC-wXVHwdRDKhZyG8jyshJvAI6g-eToWbvE'

const token_2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUXVvY180NTYifQ.ZdQTA4_t3bthx6ow5jinEKTw8gIuolD9XtfbGSzinf4'

// 3. Create user objects
const user_1 = {
  id: userId_1,
  name: 'Quoc Doan',
  image: `https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D`
}

const user_2 = {
  id: userId_2,
  name: 'Quoc Huu',
  image: `https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D`
}

// 4. Create StreamVideoClient instances
const client_1 = new StreamVideoClient({ apiKey, user: user_1, token: token_1 })
// const client_2 = new StreamVideoClient({ apiKey, user: user_2, token: token_2 })

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
    <StreamVideo client={client_1}>
      <SafeAreaView style={styles.container}>
        {activeScreen === 'call-screen' ? (
          <CallScreen goToHomeScreen={goToHomeScreen} callId={callId} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </SafeAreaView>
    </StreamVideo>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
})
