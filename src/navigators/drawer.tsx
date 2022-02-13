import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { BarcodeScan } from '../screens/barcodeScan';
import { Product } from '../screens/product';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={BarcodeScan} name='BarcodeScan' />
      <drawer.Screen component={Product} name='Product' />
    </drawer.Navigator>
  );
}
