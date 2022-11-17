/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'

import Routes from './src/Routes'

export default function App () {
  const [loaded] = useFonts({
    Montserrat: require('./src/assets/fonts/Ubuntu-Bold.ttf')
  })

  if (!loaded) {
    return null
  }
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </NativeBaseProvider>
  )
}
