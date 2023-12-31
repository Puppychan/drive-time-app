import React from 'react'
import { View, Text, Image } from 'react-native'

import { styles } from './safety.style'

export const ProfileSafetyBtn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Safety checkup</Text>
        <Text style={styles.footer}>
          Boost your safety profile by turning on additional features
        </Text>
      </View>
      <Image style={styles.icon} source={require('../../../../../assets/ic_check.png')} />
    </View>
  )
}
