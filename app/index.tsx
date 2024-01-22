import messaging from '@react-native-firebase/messaging'
// import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { User } from 'firebase/auth'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Button, Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { auth } from '@/lib/firebase/firebase'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'

import { generateData } from '../lib/data/generate-all.data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'

SplashScreen.preventAutoHideAsync()
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true
//   })
// })

const { width: screenWidth } = getScreenSize()

const generateSampleClick = () => {
  generateData()
}

export default function App() {
  const router = useRouter()
  const [appIsReady, setAppIsReady] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)

  useEffect(() => {
    const prepare = async () => {
      try {
        // firebaseApp
        // auth
        const user = auth.currentUser
        setAuthUser(user)
      } catch (e) {
        console.log(e)
      }
    }

    prepare()
    auth.onAuthStateChanged((user) => setAuthUser(user))
    setAppIsReady(true)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
      if (auth.currentUser) {
        let role = await AsyncStorage.getItem(Constant.USER_ROLE_KEY)
        if (role) {
          router.replace(`/${role.toLowerCase()}/home`)
          return
        }
      }
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  const handleDone = async () => {
    // if (auth.currentUser) {
    //   let role = await AsyncStorage.getItem(Constant.USER_ROLE_KEY)
    //   console.log("role: ", role)
    //   if (role) {
    //     router.replace(`/${role.toLowerCase()}/home`)
    //     return
    //   }
    // }
    // router.replace('/(user)/customer/home')
    router.replace('/(public)/signin')
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
        <Button style={{ padding: 50 }} onPress={generateSampleClick}>Generate</Button>
        <View
          style={styles.container}
          onLayout={onLayoutRootView}
        >
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
    height: screenWidth * 0.9
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white'
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  }
})