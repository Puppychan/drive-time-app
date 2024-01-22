import React from 'react'
import { Image, ImageStyle, Text, TouchableOpacity } from 'react-native'

import { styles } from './actionList-style'
import { connect } from 'react-redux'

const basePath = '@/assets/'

const imagePaths: Record<string, any> = {
  ic_message: require(`${basePath}ic_message.png`),
  ic_gift: require(`${basePath}ic_giftbox.png`),
  ic_voucher: require(`${basePath}ic_promotions.png`),
  ic_fav: require(`${basePath}ic_heart.png`),
  ic_setting: require(`${basePath}ic_gear.png`),
  ic_about: require(`${basePath}ic_info.png`),
  ic_signout: require(`${basePath}ic_signout.png`),
}

export const ActionList = ({ imagePath = 'ic_message', title = 'Messages', onPress = () => {}}) => {
  const selectedImage = imagePaths[imagePath]
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Image style={styles.btnIcon as ImageStyle} source={selectedImage} />

      <Text style={styles.btnText}> {title}</Text>
    </TouchableOpacity>
  )
}
