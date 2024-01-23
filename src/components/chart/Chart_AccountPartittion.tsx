import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { insightRolePartition } from '@/lib/services/insight.service'
import { PieChart } from "react-native-gifted-charts";
import { DisplayLegend } from './Legend'

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

      <View style={{ alignItems: 'center' }}>
        <PieChart
          data={rolePartitionData.chartData}
          showText
          textColor="black"
          radius={100}
          textSize={14}
          focusOnPress
          showValuesAsLabels
        />

        <View style={{ flexDirection: 'row', gap: 15 }}>
          <>
            {rolePartitionData.legends.map((legend, index) => {
              return (
                <DisplayLegend
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
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10
  },
})

export default Chart_AccountPartittion

