import { View, ScrollView, ToastAndroid, Alert } from 'react-native'

import { HorizontalDivider } from '@/src/components/divider/HorizontalDivider'

import { ActionList } from '../components/user/profile/actionList/ActionList'
import { ProfileHeader } from '../components/user/profile/header/ProfileHeader'
import { styles } from '../components/user/profile/profile.style'
import { SafetyReportButton } from '../components/user/profile/safetyReport/SafetyReportButton'
import { UtilityButton } from '../components/user/profile/utilBtn/UtilityButton'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { AccountRole } from '@/lib/models/account.model'
import { auth } from '@/lib/firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SOSDetailModal from '../components/modal/sos-detail'
import EditProfileModal from '../components/modal/edit-profile'

export const UserProfileScreen = () => {
  const [user, setUser] = useState<User | null>()
  const [role, setRole] = useState<string>(AccountRole.Customer)
  const [sosModalVisible, setSOSModalVisible] = useState(false)
  const [editProfileVisible, setEditProfileVisible] = useState(false)

  const handleSOSSubmit = () => {
    setSOSModalVisible(false)
  }

  const handlEditProfileSubmit = () => {
    setEditProfileVisible(false)
  }

  // useEffect(() => {
  //   const prepare = async () => {
  //     if (auth.currentUser) {
  //       setUser(auth.currentUser)
  //       let role = await AsyncStorage.getItem(Constant.USER_ROLE_KEY)
  //       setRole(role ?? AccountRole.Customer)
  //     }
  //     else {
  //       ToastAndroid.show("Unauthorize. Please login", ToastAndroid.SHORT)
  //       router.push('/signin')
  //       return
  //     }
  //   }
  //   prepare()
  // }, [])

  const handleSOS = () => {
    Alert.alert(
      'Safety Report',
      'Trigger SOS or Edit/Add yoir SOS Contact',
      [
        { text: 'Trigger SOS', onPress: () => {}},
        { text: 'Edit/Add SOS', onPress: () => {setSOSModalVisible(true)}},
      ],
      {
        cancelable: true,
        onDismiss: () => {setSOSModalVisible(false)}
      }
    );
  }

  const handleEditProfile = () => {
    setEditProfileVisible(true)
  }

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <ProfileHeader authUser={auth.currentUser} />

        <View style={styles.smallBtnContainer}>
          <UtilityButton imagePath="ic_help" title="Help" />
          <UtilityButton imagePath="ic_wallet" title="Wallet" />
          <UtilityButton imagePath="ic_trip" title="Trip" />
        </View>

        <TouchableOpacity
          onPress={handleSOS}
        >
          <SafetyReportButton />
        </TouchableOpacity>
        <SOSDetailModal isVisible={sosModalVisible} onSubmit={handleSOSSubmit} />
      </View>
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={7} />
      </View>

      <View style={styles.bottomContainer}>
        <ActionList imagePath="ic_message" title="Messages" />
        <ActionList imagePath="ic_gift" title="Send a gift" />
        <ActionList imagePath="ic_voucher" title="Vouchers" />
        <ActionList imagePath="ic_fav" title="Favourites" />
        <ActionList imagePath="ic_setting" title="Edit profile" onPress={handleEditProfile} />
        <ActionList imagePath="ic_about" title="About us" />
      </View>
      <EditProfileModal isVisible={editProfileVisible} onSubmit={handlEditProfileSubmit} />

    </ScrollView>
  )
}
