import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Product } from '../screens/product';
import { TestOCR } from '../screens/testOcr';
import { TabProductNavigator } from './tabProduct';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={Product} name='Product 1' />
      <drawer.Screen component={TabProductNavigator} name='Product 2' />
      <drawer.Screen component={TestOCR} name='TestOCR' />
    </drawer.Navigator>
  );
}
