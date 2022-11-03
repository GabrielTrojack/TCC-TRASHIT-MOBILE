/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'

import Routes from './src/Routes'

export default function App () {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </NativeBaseProvider>
  )
}
