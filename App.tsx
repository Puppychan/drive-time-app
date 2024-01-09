import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import Footer from './src/components/footer/Footer'
import Signup from './src/screens/Authen/SignUp'
import ErrorBoundary from './src/components/ErrorBoundary'
export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          {/* <Footer/> */}
          <Signup />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})