
import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BarChart } from "react-native-gifted-charts";
import { TransportType } from '@/lib/models/transport.model'

const Chart_BookingTransportReport = () => {
  const [data, setData] = useState<any>()
  const static_data = [
    {
      value: 230,
      label: 'Car4',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    {
      value: 180,
      label: 'Car4_VIP',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
    },
    {
      value: 195,
      label: 'Car7',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    }
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
        <Title className='text-xl px-2'>Total Bookings of Each Transportation</Title>
      </View>

      <View style={{}}>
        <BarChart
            showFractionalValues
            showYAxisIndices
            hideRules
            noOfSections={4}
            maxValue={400}
            data={static_data}
            barWidth={40}
            sideWidth={15}
            isThreeD 
            side="right"
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

export default Chart_BookingTransportReport



