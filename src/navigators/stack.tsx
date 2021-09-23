import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from '../screens/home';
import { DrawerNavigator } from './drawer';

const stack = createStackNavigator();

export function StackNavigator() {
  return (
    <stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "#fff"
        },
        headerShown: false
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </stack.Navigator>
  )
}
