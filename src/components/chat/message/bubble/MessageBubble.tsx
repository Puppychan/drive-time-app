import { Text, View } from 'react-native'
import { DateToHourMinute } from '@/src/common/utils/date-time-converter'
import { Message } from '@/src/screens/ChatScreen'
import { styles } from './msg-bubble-style'
import { auth } from '@/lib/firebase/firebase'

export const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const currentUser = auth.currentUser
  const sentByMe = currentUser && message.senderId === currentUser.uid

  return (
    <View>
      <View style={[styles.messageContainer, sentByMe ? styles.sender1 : styles.sender2]}>
        <Text style={sentByMe ? styles.sender1Text : styles.sender2Text}>{message.content}</Text>
      </View>
      <Text style={[styles.sentTime, sentByMe ? styles.sender1Time : styles.sender2Time]}>
        Sent {DateToHourMinute(Number(message.createdAt))}
      </Text>
    </View>
  )
}
