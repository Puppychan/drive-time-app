import { Colors } from '@/components/Colors'
import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function Layout() {
  return (
    <>
      <View style={styles.container}>
        <Slot />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy_black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  }
})
