import React from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from './chat.style'

export const ChatView = () => {
  return (
    <View>
      <Image style={styles.driverImage} source={require('../../../assets/user_profile.jpg')} />
    </View>
  )
}
