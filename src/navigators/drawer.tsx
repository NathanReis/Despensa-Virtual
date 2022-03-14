import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { BarcodeScan } from '../screens/barcodeScan';
import { Cart } from '../screens/cart';
import { Home } from '../screens/home';
import { Product } from '../screens/product';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={Home} name='Home' />
      <drawer.Screen component={BarcodeScan} name='BarcodeScan' />
      <drawer.Screen component={Product} name='Product' />
      <drawer.Screen component={Cart} name='Cart' />
    </drawer.Navigator>
  );
}
