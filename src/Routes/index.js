import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login, Register, Home} from '../views';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
      <Stack.Screen 
          name='Register'
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name='Home'
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Route;