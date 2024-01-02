import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Provider as PageProvider } from 'react-native-paper'

import { Button } from '@/components/Buttons'
import { Colors } from '@/components/Colors'
import InstructionCard from '@/components/cards/InstructionCard'

export default function App() {
  const router = useRouter()
  return (
    <PageProvider>
      <View style={styles.container}>
        <Text>Open up ./app/index.tsx to start working on your app!</Text>
        <InstructionCard
          imageUrl="https://source.unsplash.com/random/transport"
          title="Book a ride"
          subtitle="Book a ride to your destination"
          onShare={() => {
            ToastAndroid.show('Booking confirmed!', ToastAndroid.SHORT)
          }}
        />
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
