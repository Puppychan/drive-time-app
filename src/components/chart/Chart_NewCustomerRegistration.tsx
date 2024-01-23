import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Paragraph, Title } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { BarChart } from "react-native-gifted-charts";

const Chart_NewCustomerRegistration = () => {
  const [data, setData] = useState<any>()
  const static_data = [
    {value: 7, label: '2023'},
    {value: 20, label: '2024', frontColor: '#177AD5'}
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
        <Title className='text-xl px-2'>New Customer Registration 2023 vs 2024</Title>
      </View>

      <View style={{}}>
        <BarChart
            barWidth={15}
            noOfSections={4}
            barBorderRadius={8}
            frontColor="lightgray"
            data={static_data}
            yAxisThickness={1}
            xAxisThickness={1}
            spacing={50}
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

export default Chart_NewCustomerRegistration

