import React from 'react'
import { ScrollView } from 'react-native'

import { MessageBubble } from './bubble/msg.bubble.view'
export const ChatMessageView = () => {
  return (
    <ScrollView>
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={1} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={1} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={1} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
      <MessageBubble content={'gsfdgsfdgsdfgsfdgsfdgfd'} sender={2} createdTime={Date.now()} />
    </ScrollView>
  )
}
