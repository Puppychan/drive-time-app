import React from 'react'
import { View } from 'react-native'

import { HorizontalDivider } from 'src/components/divider/divider.horizontal'

import { ProfileHeaderView } from './header/header.view'
import { styles } from './profile.style'
import { ProfileSafetyBtn } from './safety/safety.view'
import { ProfileRoundedButton } from './utilBtn/utilBtn'

export const UserProfileView = () => {
  return (
    <View>
      <View style={styles.topContainer}>
        <ProfileHeaderView />

        <View style={styles.smallBtnContainer}>
          <ProfileRoundedButton imagePath="ic_help" title="Help" />
          <ProfileRoundedButton imagePath="ic_wallet" title="Wallet" />
          <ProfileRoundedButton imagePath="ic_trip" title="Trip" />
        </View>

        <ProfileSafetyBtn />
      </View>
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={7} />
      </View>


    </View>
  )
}
