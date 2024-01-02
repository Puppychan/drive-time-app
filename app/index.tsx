
import { Button } from '@/components/Buttons'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from "expo-router";
import { Colors } from '@/components/Colors';

export default function App() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Open up ./app/index.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center'
  }
})