import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress'
import Pulse from 'react-native-pulse'

interface YourComponentProps {}

const LoadingBar: React.FC<YourComponentProps> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        <Pulse
          color="orange"
          numPulses={3}
          diameter={300}
          speed={20}
          duration={2000}
          initialDiameter={25}
        ></Pulse>
      }
    </View>
  )
}

export default LoadingBar
