import { View, ScrollView, ToastAndroid, Alert } from 'react-native'

import { HorizontalDivider } from '@/src/components/divider/HorizontalDivider'

import { ActionList } from '@/src/components/user/profile/actionList/ActionList'
import { ProfileHeader } from '@/src/components/user/profile/header/ProfileHeader'
import { styles } from '@/src/components/user/profile/profile.style'
import { SafetyReportButton } from '@/src/components/user/profile/safetyReport/SafetyReportButton'
import { UtilityButton } from '@/src/components/user/profile/utilBtn/UtilityButton'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SOSDetailModal from '@/src/components/modal/sos-detail'
import EditProfileModal from '@/src/components/modal/edit-profile'
import { SOSScreen } from '../SOS_Screen'
import EditAvatarModal from '@/src/components/modal/edit-avatar'
import { signOut } from '@/lib/firebase/auth'

export const AdminProfileScreen = () => {
  const [isReady, setIsReady] = useState(false)
  const [authUser, setUser] = useState<User | null>()
  const [sosModalVisible, setSOSModalVisible] = useState(false)
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [sosScreenVisible, setSosScreenVisible] = useState(false)
  const [editAvatarVisible, setEditAvatarVisible] = useState(false)

  const handleSOSSubmit = () => {
    setSOSModalVisible(false)
  }

  const showEditProfileModal = () => {
    setEditProfileVisible(true)
  }

  const hideEditProfileModal = () => {
    setEditProfileVisible(false)
  }

  const handleSOSScreen = () => {
    setSosScreenVisible(false)
  }

  const showEditAvatarModal = () => {
    setEditAvatarVisible(true)
  }

  const hideEditAvatarModal = () => {
    setEditAvatarVisible(false)
  }

  useEffect(() => {
    const prepare = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser)
      }
    }
    prepare()
    setIsReady(true)
  }, [authUser])

  const handleSOS = () => {
    Alert.alert(
      'Safety Report',
      'Trigger SOS or Edit/Add yoir SOS Contact',
      [
        { text: 'Trigger SOS', onPress: () => {setSosScreenVisible(true)}},
        { text: 'Edit/Add SOS', onPress: () => {setSOSModalVisible(true)}},
      ],
      {
        cancelable: true,
        onDismiss: () => {setSOSModalVisible(false)}
      }
    );
  }

  const logout = async () => {
    try {
      await signOut()
    }
    catch (error) {
      console.log("~~~~~~~~~ ProfileScreen.tsx line 102", error)
    }
    finally {
      router.replace('/signin')
    }
  }

  if (!isReady) {
    return null
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <ProfileHeader avatarOnPress={showEditAvatarModal}/>

        <TouchableOpacity
          onPress={handleSOS}
        >
          <SafetyReportButton />
        </TouchableOpacity>
        <SOSDetailModal isVisible={sosModalVisible} onSubmit={handleSOSSubmit} />
        <SOSScreen isVisible={sosScreenVisible} onCancel={handleSOSScreen}/>
      </View>
      <View style={{ marginTop: 10 }}>
        <HorizontalDivider height={7} />
      </View>

      <View style={styles.bottomContainer}>
        <ActionList imagePath="ic_message" title="Messages" onPress={() => router.push('/customer/sos')} />
        <ActionList imagePath="ic_setting" title="Edit profile" onPress={showEditProfileModal} />
        <ActionList imagePath="ic_signout" title="Sign out" onPress={logout}/>
      </View>
      <SOSDetailModal isVisible={sosModalVisible} onSubmit={handleSOSSubmit} />
      <EditProfileModal isVisible={editProfileVisible} onSubmit={hideEditProfileModal} />
      <EditAvatarModal isVisible={editAvatarVisible} onSubmit={hideEditAvatarModal} />

    </ScrollView>
  )
}
