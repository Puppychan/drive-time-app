import { Link, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button as ReactNativeButton,
  Image,
  TouchableOpacity
} from 'react-native'
import { Button, Provider as PageProvider } from 'react-native-paper'
import Onboarding from 'react-native-onboarding-swiper'
import { Provider as ReduxProvider } from 'react-redux'

import { Colors } from '@/components/Colors'
import { generateData } from '@/lib/data/generate-all.data'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

function onClickData() {
  console.log('Calldls;fnk')
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

  const handleDone = () => {
    router.replace('/signin')
  }
  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ReduxProvider store={store}>
      <PageProvider>
        {/*
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home Page</Text>
          <Button onPress={onClickData}>Generate Data</Button>
          <Link href="/signin" asChild>
            <ReactNativeButton title="Open Signin" />
          </Link>
        </View>
        */}
        <View style={styles.container}>
          <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{ paddingHorizontal: 15 }}
            pages={[
              {
                backgroundColor: '#fff',
                image: (
                  <View style={styles.lottie}>
                    <Image
                      source={require('../assets/car7.png')}
                      style={{ width: screenWidth * 0.9, height: screenWidth }}
                    />
                  </View>
                ),

                title: 'Navigation',
                subtitle: "Don't worry about getting lost"
              },
              {
                backgroundColor: '#fff',
                //   image: <Image source={require('./images/circle.png')} />,
                image: (
                  <View style={styles.lottie}>
                    <Image
                      source={require('../assets/car7.png')}
                      style={{ width: screenWidth * 0.9, height: screenWidth }}
                    />
                  </View>
                ),
                title: 'Enviroment',
                subtitle: "Don't throw trash away"
              },
              {
                backgroundColor: '#fff',
                //   image: <Image source={require('./images/circle.png')} />,
                image: (
                  <View style={styles.lottie}>
                    <Image
                      source={require('../assets/car7.png')}
                      style={{ width: screenWidth * 0.9, height: screenWidth }}
                    />
                  </View>
                ),
                title: 'Friend Ship',
                subtitle: 'New event, new friend'
              }
            ]}
          />
        </View>
      </PageProvider>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  lottie: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white'
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  }
})
