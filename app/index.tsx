import messaging from '@react-native-firebase/messaging'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { User } from 'firebase/auth'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { auth } from '@/lib/firebase/firebase'
// import { registerForPushNotificationsAsync } from '@/lib/firebase/notification'
// import { getDeviceToken, registerForPushNotificationsAsync, schedulePushNotification } from '@/lib/firebase/notification'
import '@/lib/firebase/notification'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'

import { generateData } from '../lib/data/generate-all.data'
import { requestUserPermission } from '@/lib/firebase/notification'

// Get the full width and height of the screen

function onClickData() {
  console.log('Calldls;fnk')
  generateData()
}

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

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  const [appIsReady, setAppIsReady] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)

  useEffect(() => {
    const prepare = async () => {
      try {
        const user = auth.currentUser
        setAuthUser(user)
        // registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

        // notificationListener.current = Notifications.addNotificationReceivedListener(
        //   (notification) => {
        //     setNotification(notification)
        //   }
        // )

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(
        //   (response) => {
        //     console.log(response)
        //   }
        // )

        // return () => {
        //   Notifications.removeNotificationSubscription(notificationListener.current)
        //   Notifications.removeNotificationSubscription(responseListener.current)
        // }
      } catch (e) {
        console.log(e)
      }
    }

    prepare()
    auth.onAuthStateChanged((user) => setAuthUser(user))
    setAppIsReady(true)
  }, [])


useEffect(() => {

  if (requestUserPermission()) {
        messaging()
          .getToken()
          .then(
            token => console.log(token)
          );
      }
    }, []);
  
    // Set up the notification handler for the app
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  
    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response) => {
      const screen = response?.notification?.request?.content?.data?.screen;
      if (screen !== null) {
        navigation.navigate(screen);
      }
    };
  
    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick
      );
  
    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.data.screen,
        navigation
      );
      if (remoteMessage?.data?.screen) {
        navigation.navigate(`${remoteMessage.data.screen}`);
      }
    });
  
    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          if (remoteMessage?.data?.screen) {
            navigation.navigate(`${remoteMessage.data.screen}`);
          }
        }
      });
  
    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };
  
      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    });
  
    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage) => {
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };
  
      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };
  
    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification);
  
    // Clean up the event listeners
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);

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
        <View style={styles.container}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {notification && notification.request.content.title} </Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            <Button
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification()
              }}
            />
          </View>
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
