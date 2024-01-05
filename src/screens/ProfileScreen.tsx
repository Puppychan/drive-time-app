import React from 'react'
import { View, ScrollView } from 'react-native'

import { HorizontalDivider } from '@/src/components/divider/HorizontalDivider'

import { ActionList } from '../components/user/profile/actionList/ActionList'
import { ProfileHeader } from '../components/user/profile/header/ProfileHeader'
import { styles } from '../components/user/profile/profile.style'
import { SafetyReportButton } from '../components/user/profile/safetyReport/SafetyReportButton'
import { UtilityButton } from '../components/user/profile/utilBtn/UtilityButton'

export const UserProfileView = () => {
  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <ProfileHeader />

        <View style={styles.smallBtnContainer}>
          <UtilityButton imagePath="ic_help" title="Help" />
          <UtilityButton imagePath="ic_wallet" title="Wallet" />
          <UtilityButton imagePath="ic_trip" title="Trip" />
        </View>

        <SafetyReportButton />
      </View>
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={7} />
      </View>

      <View style={styles.bottomContainer}>
        <ActionList imagePath="ic_message" title="Messages" />
        <ActionList imagePath="ic_gift" title="Send a gift" />
        <ActionList imagePath="ic_voucher" title="Vouchers" />
        <ActionList imagePath="ic_fav" title="Favourites" />
        <ActionList imagePath="ic_setting" title="Settings" />
        <ActionList imagePath="ic_about" title="About us" />
      </View>
    </ScrollView>
  )
}
