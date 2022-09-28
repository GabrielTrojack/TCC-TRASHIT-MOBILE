import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home/Home'
// import Points from './pages/Points'
// import Detail from './pages/Detail'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Register: undefined
  Login: undefined
  Home: undefined
};

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="Login" component={Login} />
        {/* <RootStack.Screen name="Points" component={Points} />
        <RootStack.Screen name="Detail" component={Detail} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes

