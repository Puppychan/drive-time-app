import React from 'react'
import { Text, View, Image } from 'react-native'

import { styles } from './header-style'
import { User } from 'firebase/auth'

export const ProfileHeader = ({authUser}) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.userNameTxt}>{authUser.displayName ?? "User"}</Text>

        <View style={styles.userRatingContainer}>
          <Image style={styles.ratingImg} source={require('../../../../../assets/ic_star.png')} />
          <Text style={styles.userRatingTxt}> 5.0 </Text>
        </View>
      </View>
      <Image
        style={styles.userProfileImage}
        source={require('../../../../../assets/user_profile.jpg')}
      />
    </View>
  )
}
