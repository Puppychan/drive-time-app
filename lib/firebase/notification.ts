import { ResponseDto } from '@/common/response.dto'
import * as Notifications from 'expo-notifications'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { NotificationDto } from '../../common/notification.dto'
import { firebaseApp } from './firebase'

admin.initializeApp()

exports.sendNotification = functions.https.onCall((data, context) => {
  const payload = {
    notification: {
      title: data.title,
      body: data.body
    },
    token: data.token
  } as NotificationDto

  return admin
    .messaging()
    .send(payload)
    .then((response) => {
      return new ResponseDto()
    })
    .catch((error) => {
      return { success: false, error }
    })
})

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data
  console.log(token)

  return token
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
