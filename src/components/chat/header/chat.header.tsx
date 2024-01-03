import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import { styles } from './chat.header.style'

export const ChatHeaderView = () => {
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

      {/* Call Button */}
      <TouchableOpacity>
        <Image style={styles.callImage} source={require('../../../../assets/ic_call.png')} />
      </TouchableOpacity>
    </View>
  )
}
