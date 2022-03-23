import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { BarcodeScan } from '../screens/barcodeScan';
import { Cart } from '../screens/cart';
import { Home } from '../screens/home';
import { Pantry } from '../screens/pantry';
import { Product } from '../screens/product';
import { UserGroup } from '../screens/userGroups';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={Home} name='Home' />
      <drawer.Screen component={BarcodeScan} name='BarcodeScan' />
      <drawer.Screen component={Product} name='Product' />
      <drawer.Screen component={Cart} name='Cart' />
      <drawer.Screen component={Pantry} name='Pantry' />
      <drawer.Screen component={UserGroup} name='UserGroup' />
    </drawer.Navigator>
  );
}
