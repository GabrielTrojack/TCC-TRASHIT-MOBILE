import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home/Home'
// import Points from './pages/Points'
// import Detail from './pages/Detail'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const AppStack = createStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}>
        <AppStack.Screen name="Home" component={Home} />
        {/* <AppStack.Screen name="Register" component={Register} /> */}
        {/* <AppStack.Screen name="Login" component={Login} /> */}
        {/* <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} /> */}
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes

