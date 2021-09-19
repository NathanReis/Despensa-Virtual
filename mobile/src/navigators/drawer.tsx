import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Product } from '../screens/product';
import { TabProductNavigator } from './tabProduct';

let drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={Product} name='Product 1' />
      <drawer.Screen component={TabProductNavigator} name='Product 2' />
    </drawer.Navigator>
  );
}
