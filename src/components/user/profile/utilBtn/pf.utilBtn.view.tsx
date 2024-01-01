import React from 'react'
import { Text, Image, View } from 'react-native'

import { styles } from './pf.utilBtn.style'

const basePath = '../../../../../assets/'

const imagePaths = {
  ic_help: require(`${basePath}ic_help.png`),
  ic_wallet: require(`${basePath}ic_wallet.png`),
  ic_trip: require(`${basePath}ic_time.png`)
}

export const ProfileRoundedButton = ({ imagePath = 'ic_help', title = 'Help' }) => {
  const selectedImage = imagePaths[imagePath]
  return (
    <View style={styles.btnBackground}>
      <Image style={styles.btnIcon} source={selectedImage} />

      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 5 }}>{title}</Text>
    </View>
  )
}
