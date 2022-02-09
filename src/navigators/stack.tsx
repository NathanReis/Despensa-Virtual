import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Authentication } from '../screens/authentication';
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
      <stack.Screen name="Authentication" component={Authentication} />
      <stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </stack.Navigator>
  )
}
