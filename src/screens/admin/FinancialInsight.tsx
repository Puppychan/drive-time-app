import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Button, Paragraph, Title } from 'react-native-paper'

import { useThemeColors } from '@/components/Colors'
import { DEFAULT_THEME } from '@/src/common/constants/default-value.constant'
import { useEffect, useState } from 'react'
import { insightRolePartition } from '@/lib/services/insight.service'
import Chart_FinancialSummarize from '@/src/components/chart/Chart_FinancialSummarize'

const FinancialInsight = () => {
  const colorsTheme = useThemeColors(DEFAULT_THEME)
 
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.insideContainer}>
          <Chart_FinancialSummarize/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingBottom: 100
  },
  insideContainer: {
    gap: 50,
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

export default FinancialInsight

