import { ResponseDto } from '@/common/response.dto'
import * as Notifications from 'expo-notifications'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { NotificationDto } from '../../common/notification.dto'
import { firebaseApp } from './firebase'
import Constants from 'expo-constants'
import { req } from 'firebase/messaging'

export async function registerForPushNotificationsAsync() {

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
    return true
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return false
  }
  return false
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
