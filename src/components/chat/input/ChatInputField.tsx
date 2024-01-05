import React from 'react'
import { TextInput, View, Image, TouchableOpacity } from 'react-native'

import { styles } from './chat-input-style'

export const ChatInputField = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.utilBtn1} source={require('../../../../assets/ic_plus.png')} />
      </TouchableOpacity>
      <TextInput placeholder="Type something..." style={styles.input} placeholderTextColor="gray" />

      <TouchableOpacity>
        <Image style={styles.utilBtn2} source={require('../../../../assets/ic_send.png')} />
      </TouchableOpacity>
    </View>
  )
}
