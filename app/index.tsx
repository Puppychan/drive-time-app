import { Link, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button as ReactNativeButton } from 'react-native'
import { Button, Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { Colors } from '@/components/Colors'
import { generateData } from '@/lib/data/generate-all.data'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'
import { auth, firebaseApp } from '@/lib/firebase/firebase'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

function onClickData() {
  console.log("Calldls;fnk");
  generateData()
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts + APIs
        firebaseApp
        auth
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
          <Button onPress={onClickData}>Generate Data</Button>
          <Link href="/signin" asChild>
            <ReactNativeButton title="Open Signin" />
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
