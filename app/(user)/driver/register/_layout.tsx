import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import { Colors } from '../../../../components/Colors'

export default function Layout() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Slot />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy_black,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
