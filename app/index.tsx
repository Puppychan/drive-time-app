import messaging from '@react-native-firebase/messaging'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { User } from 'firebase/auth'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { auth } from '@/lib/firebase/firebase'
// import { registerForPushNotificationsAsync } from '@/lib/firebase/notification'
import { getDeviceToken, registerForPushNotificationsAsync } from '@/lib/firebase/notification'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'

import { generateData } from '../lib/data/generate-all.data'

SplashScreen.preventAutoHideAsync()
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const { width: screenWidth } = getScreenSize()

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
        await registerForPushNotificationsAsync()
        console.log('Done register push notification')
        const token = await getDeviceToken()
        console.log('doneee get token', token)

        // Foreground message handler
        messaging().onMessage(async (remoteMessage: any) => {
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
        })

        // Background message handler
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
          console.log('Message handled in the background!', remoteMessage)
        })
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
          <Link href="../driver/register/chat" asChild>
            <Button>Open SignIn</Button>
          </Link>
        </View>
        */}
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
