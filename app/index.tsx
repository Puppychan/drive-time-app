import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Provider as PageProvider } from 'react-native-paper'

import { Button } from '@/components/Buttons'
import { Colors } from '@/components/Colors'
import InstructionCard from '@/components/cards/InstructionCard'
import ServiceCard from '@/components/cards/ServiceCard'

export default function App() {
  const router = useRouter()
  return (
    <PageProvider>
      <View style={styles.container}>
        <Text>Open up ./app/index.tsx to start working on your app!</Text>
        <ServiceCard title="2-Wheels" icon={ICON_2_WHEELS} />
        <ServiceCard title="Reserve" icon={ICON_RESERVE} />
        <StatusBar style="auto" />
      </View>
    </PageProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    overflow: 'scroll'
  }
})
