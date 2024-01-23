//import React from 'react';
import {
  Call,
  StreamCall,
  CallContent,
  StreamVideoClient,
  StreamVideo
} from '@stream-io/video-react-native-sdk'


const apiKey = 'zz984t9cyrwj'
const userId_1 = 'Quoc_123'
// const userId_2 = 'mudoker'
const callId = 'default_98c5fbc7-9de4-4911-868f-10319ed0db10'

// JWT
const token_1 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUXVvY18xMjMifQ.1CF0krC8Ap-Ge0Sq1NY_Yf2_P7bDE0Rbv2FrLZKgfzA'


const user_1 = {
  id: userId_1,
  name: 'Quoc Doan',
  image: `https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D`
}

// const user_2 = {
//   id: userId_2,
//   name: 'Quoc Huu',
//   image: `https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D`
// }

// 4. Create StreamVideoClient instances
// const client_2 = new StreamVideoClient({ apiKey, user: user_2, token: token_2 })


import React, { useEffect } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'

type Props = { goToHomeScreen: () => void }
const client = new StreamVideoClient({ apiKey, user: user_1, token: token_1 })

export const CallScreen = ({ goToHomeScreen }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const [isPermission, setPermission] = React.useState(false)
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === 'android') {
        const permissionsResult = await PermissionsAndroid.requestMultiple([
          'android.permission.POST_NOTIFICATIONS',
          'android.permission.BLUETOOTH_CONNECT',
          'android.permission.CAMERA',
          'android.permission.RECORD_AUDIO'
        ])

        setPermission(true)
        console.log('Permissions Result:', permissionsResult)
      }
    }

    run()
  }, [])

  useEffect(() => {
    const call = client.call('default', callId);
    call.join({ create: true })
      .then(() => setCall(call));
  }, [client]);

  if (!call) {
    return <Text>Joining call...</Text>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <View style={styles.container}>
          <CallContent
            onHangupCallHandler={goToHomeScreen}
          />
        </View>
      </StreamCall>
    </StreamVideo>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 100
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#005fff'
  }
})

const joinStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: 20
  }
})
