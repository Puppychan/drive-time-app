import React, { useEffect, useState } from 'react'
import { Text, View, Image, Alert } from 'react-native'

import { styles } from './header-style'
import { User } from 'firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { auth } from '@/lib/firebase/firebase'

export const ProfileHeader = ({authUser, avatarOnPress}) => {
  const [image, setImage] = useState<string |null>(null);

  useEffect(() => {
    console.log(auth.currentUser?.photoURL)
    setImage(auth.currentUser?.photoURL ?? null)
  }, [image])

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.userNameTxt}>{authUser.displayName ?? "User"}</Text>

        <View style={styles.userRatingContainer}>
          <Image style={styles.ratingImg} source={require('../../../../../assets/ic_star.png')} />
          <Text style={styles.userRatingTxt}> 5.0 </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Image 
          style={styles.userProfileImage}
          source={image ? { uri: image } : require('@/assets/user_profile.jpg') } 
        />
        <TouchableOpacity
          onPress={avatarOnPress}
        >
          <AntDesign name="picture" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
