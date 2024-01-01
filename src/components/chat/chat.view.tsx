import React from 'react'
import { View } from 'react-native'

import { ChatHeaderView } from './header/chat.header'
import { ChatInputField } from './input/chat.input.view'
import { ChatMessageView } from './message/chat.msg.view'
import { HorizontalDivider } from '../divider/divider.horizontal'

export const ChatView = () => {
  return (
    <View style={{ height: '100%' }}>
      <ChatHeaderView />
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={2} />
      </View>
      <ChatMessageView />

      <ChatInputField />
    </View>
  )
}
