// import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
// import * as admin from 'firebase-admin'
// import * as Device from 'expo-device'
// import * as functions from 'firebase-functions'

// const serviceAccount = require('../common/drive-time-9c8e7-firebase-adminsdk-ujx1j-4d147b9f4a.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// })

// exports.sendPushNotification = functions.firestore
//   .document('notifications/{notificationId}')
//   .onCreate(async (snapshot, context) => {
//     const notification = snapshot.data()

//     const message = {
//       token: notification.token,
//       notification: {
//         title: notification.title,
//         body: notification.body
//       }
//     }

//     try {
//       await admin.messaging().send(message)
//       console.log('Notification sent successfully')
//     } catch (error) {
//       console.error('Error sending notification:', error)
//     }
//   })
// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission()
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL

//   if (enabled) {
//     console.log('Authorization status:', authStatus)
//   }
// }

// export const onAppBootstrap = async () => {
//   await messaging().registerDeviceForRemoteMessages()
//   const token = await messaging().getToken()
//   console.log('Device FCM Token:', token)
//   return token
// }

// export const onMessageReceived = async (message) => {
//   console.log('Received message:', message)
// }

// export const initializeMessaging = () => {
//   messaging().onMessage(onMessageReceived)
//   messaging().setBackgroundMessageHandler(onMessageReceived)
//   onAppBootstrap()
// }
