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

const Chart_AccountPartittion = () => {
  const [rolePartitionData, setRolePartitionData] = useState<any>()

  useEffect(() => {
    (async () => {
      const dataRolePartition = await insightRolePartition()
      setRolePartitionData(dataRolePartition)
    })();
  }, [rolePartitionData]);

  if (!rolePartitionData) return null
  
  return (
    <View style={styles.container}>
      <View>
        <Title className='text-xl px-2'>Account Partition</Title>
      </View>

      <View style={{}}>
        <PieChart
          data={rolePartitionData.chartData}
          showText
          textColor="black"
          radius={100}
          textSize={14}
          focusOnPress
          showValuesAsLabels
        />

        <View style={{flexDirection:'row', gap:10}}>
          <>
            {rolePartitionData.legends.map((legend, index) => {
              return (
                <Legend 
                  text={legend.text} 
                  color={legend.color}
                />
              )
            })}
          </>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
})

export default Chart_AccountPartittion

