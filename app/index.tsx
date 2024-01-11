import { Link, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { Colors } from '@/components/Colors'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts + APIs
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  // hide splash screen when the app is ready
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
        {/* <AppNavigator /> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <StatusBar style="light" /> */}
          <Text>Home Page</Text>
          <Link href="../driver/register/chat" asChild>
            <Button>Open SignIn</Button>
          </Link>
        </View>
      </PageProvider>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    overflow: 'scroll'
  }
})
