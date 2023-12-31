import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

import { styles } from './actionList.style'

const basePath = '../../../../../assets/'

const imagePaths = {
  ic_message: require(`${basePath}ic_message.png`),
  ic_gift: require(`${basePath}ic_giftbox.png`),
  ic_voucher: require(`${basePath}ic_promotions.png`),
  ic_fav: require(`${basePath}ic_heart.png`),
  ic_setting: require(`${basePath}ic_gear.png`),
  ic_about: require(`${basePath}ic_info.png`)
}

export const ProfileActionList = ({ imagePath = 'ic_message', title = 'Messages' }) => {
  const selectedImage = imagePaths[imagePath]
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Image style={styles.btnIcon} source={selectedImage} />

      <Text style={styles.btnText}> {title}</Text>
    </TouchableOpacity>
  )
}
