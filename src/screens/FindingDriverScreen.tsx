import React from 'react';
import { View, Image } from 'react-native';
import Pulse from 'react-native-pulse';

interface YourComponentProps {}

const FindingDriverScreen: React.FC<YourComponentProps> = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pulse
        color="orange"
        numPulses={3}
        diameter={100}
        speed={20}
        duration={2000}
        initialDiameter={20}
      />
    </View>
  );
};

export default FindingDriverScreen;
