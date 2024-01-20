import { Colors } from '@/components/Colors'
import { CustomFooter } from '@/src/components/footer/CustomFooter'
import Footer from '@/src/components/footer/Footer'
import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function Layout() {
  return (
    <>
      <View style={styles.container}>
        <Slot />
        {/* <Footer /> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center',

  }
})
