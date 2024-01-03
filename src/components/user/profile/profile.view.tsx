import React from 'react'
import { View, ScrollView } from 'react-native'

import { HorizontalDivider } from '@/src/components/divider/HorizontalDivider'

import { ProfileActionList } from './actionList/pf.actionList.view'
import { ProfileHeaderView } from './header/pf.header.view'
import { styles } from './profile.style'
import { ProfileSafetyBtn } from './safety/pf.safety.view'
import { ProfileRoundedButton } from './utilBtn/pf.utilBtn.view'

export const UserProfileView = () => {
  return (
    <ScrollView>
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

      <View style={styles.bottomContainer}>
        <ProfileActionList imagePath="ic_message" title="Messages" />
        <ProfileActionList imagePath="ic_gift" title="Send a gift" />
        <ProfileActionList imagePath="ic_voucher" title="Vouchers" />
        <ProfileActionList imagePath="ic_fav" title="Favourites" />
        <ProfileActionList imagePath="ic_setting" title="Settings" />
        <ProfileActionList imagePath="ic_about" title="About us" />
      </View>
    </ScrollView>
  )
}
