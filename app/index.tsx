import { Link, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button as ReactNativeButton } from 'react-native'
import { Button, Provider as PageProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { Colors } from '@/components/Colors'
import { generateData } from '@/lib/data/generate-all.data'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { store } from '@/store'
import { auth, firebaseApp } from '@/lib/firebase/firebase'
import { AppButton } from '@/src/components/button/Buttons'
import { signOut } from '@/lib/firebase/auth'
import { onAuthStateChanged, User } from 'firebase/auth'

// Get the full width and height of the screen
const { width: screenWidth } = getScreenSize()

function onClickData() {
  console.log("Calldls;fnk");
  generateData()
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const router = useRouter()
  const [authUser, setUser] = useState<User>()
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const prepare = async () => {
      try {
        firebaseApp
        auth
      } catch (e) {
        console.log(e)
      }
    }

    prepare()
    auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(undefined);
    })
    setAppIsReady(true)

    
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }


  return (
    <ReduxProvider store={store}>
      <PageProvider>
        <View 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onLayout={onLayoutRootView}
        >
          <Text>Home Page</Text>
          <Button onPress={onClickData}>Generate Data</Button>
          <>
          {
            authUser ? 
              <>
                <Text>{"Hi,  " +  authUser.displayName}</Text>
                <AppButton
                  title='Sign out'
                  onPress={handleSignOut}
                />
              </>
            : 
          
              <>
                <AppButton
                  title='Sign in'
                  onPress={() => {router.push("/signin")}}
                />
              </>
          }
          </>
          
        </View>
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
