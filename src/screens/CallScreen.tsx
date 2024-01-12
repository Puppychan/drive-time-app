//import React from 'react';
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  CallContent,
  useCalls,
  CallingState,
  IncomingCall,
  OutgoingCall
} from '@stream-io/video-react-native-sdk'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = { goToHomeScreen: () => void; callId: string }

export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null)
  const client = useStreamVideoClient()

  const calls = useCalls()

  useEffect(() => {
    if (client) {
      const call = client.call('default', callId)

      try {
        call
          .getOrCreate({
            ring: true,
            data: {
              members: [{ user_id: 'Quoc_123' }, { user_id: 'Quoc_456' }]
            }
          })
          .then(() => {
            // Check if the call is still active before setting it
            if (call.state.callingState !== CallingState.LEFT) {
              setCall(call)
            } else {
              console.warn('The call has already been left.')
            }
          })
          .catch((error) => {
            console.error('Error creating the call:', error)
          })
      } catch (error) {
        console.error('Error creating the call:', error)
      }
    }
  }, [callId, client])

  if (!call) {
    return (
      <View style={joinStyles.container}>
        <Text style={styles.text}>Joining call...</Text>
      </View>
    )
  }

  // handle incoming ring calls
  const incomingCalls = calls.filter(
    (call) => call.isCreatedByMe === false && call.state.callingState === CallingState.RINGING
  )

  const [incomingCall] = incomingCalls

  if (incomingCall) {
    // render the incoming call UI
    return (
      <StreamCall call={call}>
        <View style={styles.container}>
          <IncomingCall
            onRejectCallHandler={goToHomeScreen}
            onAcceptCallHandler={() => {
              return (
                <StreamCall call={call}>
                  <CallContent onHangupCallHandler={call.endCall} />
                </StreamCall>
              )
            }}
          />
        </View>
      </StreamCall>
    )
  }

  // handle outgoing ring calls
  const outgoingCalls = calls.filter(
    (call) => call.isCreatedByMe === true && call.state.callingState === CallingState.RINGING
  )

  const [outgoingCall] = outgoingCalls
  if (outgoingCall) {
    // render the outgoing call UI
    return (
      <StreamCall call={call}>
        <View style={styles.container}>
          <OutgoingCall onHangupCallHandler={call.endCall} />
        </View>
      </StreamCall>
    )
  } else {
    try {
      goToHomeScreen()
    } catch (error) {
      console.warn(error)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
