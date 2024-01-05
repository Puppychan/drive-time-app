import { View } from 'react-native'

import { ChatHeader } from '../components/chat/header/ChatHeader'
import { ChatInputField } from '../components/chat/input/ChatInputField'
import { ChatMessageView } from '../components/chat/message/MessageView'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'

export const ChatView = () => {
  return (
    <View style={{ height: '100%' }}>
      <ChatHeader />
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={2} />
      </View>
      <ChatMessageView />

      <ChatInputField />
    </View>
  )
}
