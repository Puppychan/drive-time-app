import { NavigationContainer } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import { Colors } from '@/components/Colors'

import AppNavigator from '@/src/AppNavigator'
import { store } from '@/store'
import ServiceCardLarge from '@/components/cards/ServiceCardLarge'
import FullScreenCard from '@/components/cards/FullScreenCard'
import { getScreenSize } from '@/common/helpers/default-device-value.helper'
import ServiceCardTextInside from '@/components/cards/ServiceCardTextInside'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

export default function App() {
  const router = useRouter()
  return (
    <ReduxProvider store={store}>
      <PageProvider>
        <AppNavigator />

        {/* <View style={styles.container}>
          <Text>Open up ./app/index.tsx to start working on your app!</Text>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <ServiceCardTextInside
              iconImage="https://source.unsplash.com/random?transport"
              title="Book a ride"
              onClick={() => {
                ToastAndroid.show('Booking confirmed!', ToastAndroid.SHORT)
              }}
            />
          </View>
          <StatusBar style="auto" />
        </View> */}
      </PageProvider>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    overflow: 'scroll'
  }
})
