import { View } from 'react-native'

import { ChatHeaderView } from '../components/chat/header/ChatHeader'
import { ChatInputField } from '../components/chat/input/chat.input.view'
import { ChatMessageView } from '../components/chat/message/chat.msg.view'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'

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
