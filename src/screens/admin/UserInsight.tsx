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
import { insightRolePartition } from '@/lib/services/insight.service'
import { PieChart } from "react-native-gifted-charts";
import { Legend } from '@/src/components/chart/legend'
import Chart_AccountPartittion from '@/src/components/chart/Chart_AccountPartittion'
import Chart_NewCustomerRegistration from '@/src/components/chart/Chart_NewCustomerRegistration'

const UserInsight = () => {
  const colorsTheme = useThemeColors(DEFAULT_THEME)
  const [rolePartitionData, setRolePartitionData] = useState<any>()
  const dispatch = useDispatch()

  
  useEffect(() => {
    (async () => {
      const dataRolePartition = await insightRolePartition()
      setRolePartitionData(dataRolePartition)
    })();
  }, []);

  if (!rolePartitionData) return null
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.insideContainer}>
          <Chart_AccountPartittion/>
          <Chart_NewCustomerRegistration/>
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
    gap: 35,
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

export default UserInsight

