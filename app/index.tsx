import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '@/store'

import { CallControllerScreen } from '../src/screens/CallControllerScreen'

// Get the full width and height of the screen

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <ReduxProvider store={store}>
      <PageProvider>
        <CallControllerScreen />

        {/* <View style={styles.container}>
          <Text>Open up ./app/index.tsx to start working on your app!</Text>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <ServiceCardTextInside
              iconImage="https://source.unsplash.com/random?transport"
              title="Book a ride"
              onClick={() => {
                ToastAndroid.show('Booking confirmed!', ToastAndroid.SHORT)
              }}
            />
          </View>
          <StatusBar style="auto" />
        </View> */}
      </PageProvider>
    </ReduxProvider>
  )
}
