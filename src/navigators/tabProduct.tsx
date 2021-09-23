import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Product } from '../screens/product';

let tab = createMaterialBottomTabNavigator();

export function TabProductNavigator() {
  return (
    <tab.Navigator>
      <tab.Screen component={Product} name='New' />
      <tab.Screen component={Product} name='List' />
    </tab.Navigator>
  );
}
