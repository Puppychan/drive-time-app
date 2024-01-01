import React from 'react'
import { Text, View, Image } from 'react-native'

import { styles } from './chat.style'
import { ChatHeaderView } from './header/chat.header'
import { HorizontalDivider } from '../divider/divider.horizontal'

export const ChatView = () => {
  return (
    <View>
      <ChatHeaderView />
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={2} />
      </View>
    </View>
  )
}
