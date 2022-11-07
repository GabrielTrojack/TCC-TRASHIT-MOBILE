import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Points from './pages/Points/Points'
import RequestPoint from './pages/RequestPoint/RequestPoint'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const RootStack = createStackNavigator<RootStackParamList>()

export interface RootStackParamList {
  Points: undefined
  Register: undefined
  Login: undefined
  Home: undefined
  RequestPoint: undefined
}

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Points"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}>
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Points" component={Points} />
        <RootStack.Screen name="RequestPoint" component={RequestPoint} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
