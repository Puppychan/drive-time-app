import { PermissionsAndroid } from 'react-native'
import { ResponseDto } from '@/common/response.dto'
import * as Notifications from 'expo-notifications'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { NotificationDto } from '../../common/notification.dto'
import { firebaseApp } from './firebase'
import Constants from 'expo-constants'
import messaging from '@react-native-firebase/messaging'

export async function registerForPushNotificationsAsync() {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync()
  //   let finalStatus = existingStatus

  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync()
  //     finalStatus = status
  //     return true
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!')
  //     return false
  //   }
  //   return false
  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

  console.log('Permisssiondds status'), status
}

export async function getDeviceToken() {
  await messaging().registerDeviceForRemoteMessages()
  const token = await messaging().getToken()
  if (token) {
    console.log('Device FCM Token:', token)
    return token
    // Your logic to send the token to the server
  }
  return ''
}

export const sendNotification = async (token: string, title: string, body: string) => {
  const functions = getFunctions(firebaseApp)
  const sendNotificationFunction = httpsCallable(functions, 'sendNotification')
  try {
    const response = await sendNotificationFunction({ token, title, body })
    console.log('Notification sent:', response)
  } catch (error) {
    console.error('Error sending notification:', error)
  }
}
