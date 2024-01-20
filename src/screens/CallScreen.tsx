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
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = { goToHomeScreen: () => void; callId: string }
const filterCalls = (calls: Call[], createdByMe: boolean, callingState: CallingState) =>
  calls.filter(
    (call) => call.isCreatedByMe === createdByMe && call.state.callingState === callingState
  )

export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null)
  const [callAccepted, setCallAccepted] = useState(false)

  const client = useStreamVideoClient()

  const calls = useCalls()

  useEffect(() => {
    if (client) {
      // Create call object directly for clarity
      const call = client.call('default', callId)

      try {
        call
          .getOrCreate({
            ring: true,
            data: { members: [{ user_id: 'mudoker' }, { user_id: 'Quoc_123' }] }
          })
          .then(() => {
            setCall(call)
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
  const incomingCalls = filterCalls(calls, false, CallingState.RINGING)
  const [incomingCall] = incomingCalls

  if (incomingCall) {
    return (
      <StreamCall call={incomingCall}>
        <View style={styles.container}>
          {callAccepted === false ? (
            <IncomingCall
              onRejectCallHandler={goToHomeScreen}
              onAcceptCallHandler={() => setCallAccepted(true)}
            />
          ) : (
            <CallContent onHangupCallHandler={goToHomeScreen} />
          )}
        </View>
      </StreamCall>
    )
  }

  // handle outgoing ring calls
  const outgoingCalls = filterCalls(calls, true, CallingState.RINGING)
  const [outgoingCall] = outgoingCalls

  if (outgoingCall) {
    return (
      <StreamCall call={outgoingCall}>
        <View style={styles.container}>
          <OutgoingCall
            onHangupCallHandler={async () => {
              try {
                if (outgoingCall.state.callingState !== CallingState.LEFT) {
                  await outgoingCall.endCall()
                } else {
                  console.warn('The call has already been left.')
                }
              } catch (error) {
                console.error('Error hanging up the call:', error)
              }
            }}
          />
        </View>
      </StreamCall>
    )
  }

  goToHomeScreen()

  return null
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
