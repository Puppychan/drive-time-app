import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Button, Paragraph, Title } from 'react-native-paper'

import { useThemeColors } from '@/components/Colors'
import { AccountRole } from '@/lib/models/account.model'
import { DEFAULT_THEME } from '@/src/common/constants/default-value.constant'
import {
  INSTRUCTION_LIST,
  SHORT_INSTRUCTION_LIST
} from '@/src/common/constants/instruction-list.constant'
import { SUGGESTION_LIST } from '@/src/common/constants/suggestion-list.constant'
import { verticalLeftView } from '@/src/common/utils/custom-view.style'
import FullScreenCard from '@/src/components/cards/FullScreenCard'
import InstructionCard from '@/src/components/cards/InstructionCard'
import ServiceCard from '@/src/components/cards/ServiceCard'
import CircleIcon from '@/src/components/image/CircleIcon'
import SearchInput from '@/src/components/input/SearchInput'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import { User } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'

import { signOut } from '@/lib/firebase/auth'
import { LocationObject } from 'expo-location';
import * as Location from "expo-location";
import { useDispatch } from 'react-redux'
import { setCurrentLocation } from '@/src/slices/navSlice'
// TODO: change to dynamic later

const AdminHomeScreen = () => {
  const colorsTheme = useThemeColors(DEFAULT_THEME)
  const [user, setUser] = useState<User | null>()
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    }
  }, [])

  const onClickHomeSection = () => {
    // navigation.navigate('Profile')
    router.replace(`/admin/dashboard`)
  }

  const onClickSuggestions = (index: number) => {
    router.push('/(user)/customer/map')
  }

  const onClickInsightUser = () => {
    router.push('/admin/insight-user')
  }
  

  const onClickInsightFinance = () => {
    router.push('/admin/insight-finace')
  }

  const onClickInsightService = () => {
    router.push('/admin/insight-service')
  }

  const onClickManageDriver = () => {
    router.push('/admin/dashboard')
  }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      // Update the type of location state
      dispatch(
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      )
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.insideContainer}>
          <Title className='text-3xl p-4 pb-0 font-semibold'>Welcome, {user?.displayName ?? "Admin"}</Title>

          <TouchableOpacity className='mx-4 bg-white border border-black/10 px-4 py-1 rounded-lg' onPress={onClickHomeSection}>
            <View className='flex flex-row gap-4 items-center'>
              <CircleIcon
                name="settings"
                size={24}
                color={colorsTheme.background}
                backgroundColor={colorsTheme.opposite_bg}
              />

              <View style={{ ...verticalLeftView, flexGrow: 1 }}>
                <Title>Admin Dashboard</Title>
                <Paragraph>Administrative management </Paragraph>
              </View>
              <CircleIcon name="arrow-right" size={35} color={colorsTheme.opposite_bg} />
            </View>
          </TouchableOpacity>

          {/* <View className='h-0.5 w-full bg-black/10' /> */}

          <View style={styles.subsection}>
            <Title className='text-2xl px-2'>Quick Access</Title>
          </View>

          <View className='flex flex-row gap-2 px-8'>
            <ServiceCard
              iconImage={require('@/assets/driver_management.png')}
              title='Manage Driver'
              onClick={onClickManageDriver}
            />
            <ServiceCard
              iconImage={require('@/assets/financial_insight.png')}
              title='Financial Insights'
              onClick={onClickInsightFinance}
            />
          </View>

          <View className='flex flex-row gap-2 px-8'>
            <ServiceCard
              iconImage={require('@/assets/user_insight.png')}
              title='Users & Account Reports'
              onClick={onClickInsightUser}
            />
            <ServiceCard
              iconImage={require('@/assets/service_insight.png')}
              title='Services Reports'
              onClick={onClickInsightService}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35
  },
  insideContainer: {
    gap: 15,
    marginTop: 20,
    marginBottom: 50
  },
  welcome: {
    fontSize: 30,
    paddingBottom: 10
  },
  pickupCard: {
    margin: 10
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  planningImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#202020',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default AdminHomeScreen

