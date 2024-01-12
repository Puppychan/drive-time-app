import { NavigationContainer } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { Colors } from '@/components/Colors'
import AppNavigator from '@/src/AppNavigator'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import FullScreenCard from '@/src/components/cards/FullScreenCard'
import ServiceCardLarge from '@/src/components/cards/ServiceCardLarge'
import ServiceCardTextInside from '@/src/components/cards/ServiceCardTextInside'
import { UserProfileScreen } from '@/src/screens/ProfileScreen'
import { store } from '@/store'

import { CallControllerScreen } from '../src/screens/CallControllerScreen'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const router = useRouter()

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    overflow: 'scroll'
  }
})
