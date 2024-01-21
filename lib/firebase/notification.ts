// import { PermissionsAndroid } from 'react-native'
// import { ResponseDto } from '@/common/response.dto'
// import * as Notifications from 'expo-notifications'
// import { getFunctions, httpsCallable } from 'firebase/functions'
// import { NotificationDto } from '../../common/notification.dto'
// import { firebaseApp } from './firebase'
// import messaging from '@react-native-firebase/messaging'

// export async function registerForPushNotificationsAsync() {
//   //   const { status: existingStatus } = await Notifications.getPermissionsAsync()
//   //   let finalStatus = existingStatus

//   //   if (existingStatus !== 'granted') {
//   //     const { status } = await Notifications.requestPermissionsAsync()
//   //     finalStatus = status
//   //     return true
//   //   }
//   //   if (finalStatus !== 'granted') {
//   //     alert('Failed to get push token for push notification!')
//   //     return false
//   //   }
//   //   return false
//   const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

//   console.log('Permisssiondds status'), status
// }

// export async function getDeviceToken() {
//   await messaging().registerDeviceForRemoteMessages()
//   const token = await messaging().getToken()
//   if (token) {
//     console.log('Device FCM Token:', token)
//     return token
//     // Your logic to send the token to the server
//   }
//   return ''
// }

// export const sendNotification = async (token: string, title: string, body: string) => {
//   const functions = getFunctions(firebaseApp)
//   const sendNotificationFunction = httpsCallable(functions, 'sendNotification')
//   try {
//     const response = await sendNotificationFunction({ token, title, body })
//     console.log('Notification sent:', response)
//   } catch (error) {
//     console.error('Error sending notification:', error)
//   }
// }

import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const serviceAccount = require('../common/drive-time-9c8e7-firebase-adminsdk-ujx1j-4d147b9f4a.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

exports.sendPushNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    const notification = snapshot.data()

    const message = {
      token: notification.token, // Expo push token
      notification: {
        title: notification.title,
        body: notification.body
      }
    }

    try {
      await admin.messaging().send(message)
      console.log('Notification sent successfully')
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  })

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

// Note that an async function or a function that returns a Promise
// is required for both subscribers.
async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
  console.log('Received message', message)
  // Do something
}
export async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages()

  // Get the token
  const token = await messaging().getToken()
  console.log('Tokennn', token)
  return token

  // Save the token
  //   await postToApi('/users/1234/tokens', { token })
}

messaging().onMessage(onMessageReceived)
messaging().setBackgroundMessageHandler(onMessageReceived)
onAppBootstrap()
