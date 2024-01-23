import { Text, View, Image, TouchableOpacity } from 'react-native'

import { styles } from './chat-header-style'

interface Props {
  onBack: () => void
}

export const ChatHeader = ({ onBack }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.driverInfoContainer}>
        <Image style={styles.driverImage} source={require('../../../../assets/user_profile.jpg')} />
        <View>
          <Text style={styles.driverName}>Quoc Doan</Text>
          <View style={styles.driverRatingContainer}>
            <Text style={styles.driverStar}>5.0</Text>
            <Image
              style={styles.driverStarImage}
              source={require('../../../../assets/ic_star.png')}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.driverStar}>Back to map</Text>
      </TouchableOpacity>
    </View>
  )
}
