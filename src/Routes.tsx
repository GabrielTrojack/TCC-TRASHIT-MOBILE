import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home/Home'
import Points from './pages/Points/Points'
// import Detail from './pages/Detail'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const RootStack = createStackNavigator<RootStackParamList>()

export interface RootStackParamList {
  Points: undefined
  Register: undefined
  Login: undefined
  Home: undefined
}

const Routes = () => {
  // const config = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 500,
  //     mass: 3,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01
  //   }
  // }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}>
        {/* <RootStack.Screen name="Home" component={Home} /> */}
        {/* <RootStack.Screen name="Register" component={Register}
        options={{
          transitionSpec: {
            open: config,
            close: config
          }
        }}
        /> */}
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Points" component={Points} />
        {/* <RootStack.Screen name="Detail" component={Detail} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
