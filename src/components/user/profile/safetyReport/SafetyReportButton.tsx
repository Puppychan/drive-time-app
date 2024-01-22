import React from 'react'
import { View, Text, Image } from 'react-native'

import { styles } from './safety-button-style'

export const SafetyReportButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Safety Report</Text>
        <Text style={styles.footer}>
          Boost your safety. You can trigger SOS in case of emergency. 
        </Text>
      </View>
      <Image style={styles.icon} source={require('../../../../../assets/ic_check.png')} />
    </View>
  )
}
