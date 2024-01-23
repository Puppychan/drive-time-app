
import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BarChart, LineChart } from "react-native-gifted-charts";
import { TransportType } from '@/lib/models/transport.model'

const Chart_FinancialSummarize = () => {
  const [data, setData] = useState<any>()
  const static_data = [
    {value: 0, dataPointText: '0', label: '0'},
    {value: 150, dataPointText: '150', label: '2023'},
    {value: 350, dataPointText: '350', label: '2024'}
  ]

  // useEffect(() => {
  //   (async () => {
  //     // const data = await insightRolePartition()
  //     setData(static_data)
  //   })();
  // }, [data]);

  // if (!data) return null
  
  return (
    <View style={styles.container}>
      <View>
        <Title className='text-xl px-2'>Financial Summarize</Title>
      </View>

      <View style={{}}>
        <LineChart
          initialSpacing={0}
          data={static_data}
          spacing={100}
          textColor1="black"
          textShiftY={20}
          textShiftX={10}
          textFontSize={13}
          thickness={5}
          // hideRules
          // hideYAxisText
          yAxisColor="#0BA5A4"
          showVerticalLines
          verticalLinesColor="rgba(14,164,164,0.5)"
          xAxisColor="#0BA5A4"
          color="#0BA5A4"
       />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    flexDirection: 'column',
    gap: 20
  },
})

export default Chart_FinancialSummarize



