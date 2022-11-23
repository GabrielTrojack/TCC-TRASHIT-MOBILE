/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NativeBaseProvider } from 'native-base'
import React, {
  // useCallback,
  //  useEffect,
  //   useState
} from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import {
  StatusBar,
  LogBox
  // View
} from 'react-native'
// import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import Routes from './src/Routes'

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false)

  // useEffect(() => {
  //   async function prepare () {
  //     try {
  //       await useFonts({
  //         Ubuntu_700Bold
  //       })
  //       await new Promise(resolve => setTimeout(resolve, 2000))
  //     } catch (e) {
  //       console.warn(e)
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true)
  //     }
  //   }

  //   prepare()
  // }, [])

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [appIsReady])

  // if (!appIsReady) {
  //   return null
  // }

  LogBox.ignoreLogs([
    'Warning: Each child in a list should have a unique "key" prop.'
  ])

  return (
    <NativeBaseProvider>
      {/* <View onLayout={onLayoutRootView}> */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
      {/* </View> */}
    </NativeBaseProvider>
  )
}
