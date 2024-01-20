import * as Notifications from 'expo-notifications'
import * as functions from 'firebase-functions'

import { auth } from './firebase'

// exports.sendNotification = functions.https.onCall((data, context) => {
//   const payload = {
//     notification: {
//       title: 'New Notification',
//       body: data.message
//     }
//   }

//   return admin.messaging().sendToDevice(data.token, payload)
// })

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

async function sendPushNotification(expoPushToken: string, message: string) {
  const messageToSend = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: message,
    data: { data: 'goes here' }
  }

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageToSend)
    })
  } catch (error) {
    console.log(error)
  }
}
