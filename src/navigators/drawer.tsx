import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { BarcodeScan } from '../screens/barcodeScan';
import { Cart } from '../screens/cart';
import { Home } from '../screens/home';
import { Pantry } from '../screens/pantry';
import { Product } from '../screens/product';
import { UserGroup } from '../screens/userGroup';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator
      screenOptions={{
        headerStyle: { height: 80 },
        sceneContainerStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <drawer.Screen component={Home} name='Home' />
      <drawer.Screen component={BarcodeScan} name='BarcodeScan' options={{ title: 'Código de barras' }} />
      <drawer.Screen component={Product} name='Product' options={{ title: 'Produto' }} />
      <drawer.Screen component={Cart} name='Cart' options={{ title: 'Carrinho' }} />
      <drawer.Screen component={Pantry} name='Pantry' options={{ title: 'Meus produtos' }} />
      <drawer.Screen component={UserGroup} name='UserGroup' options={{ title: 'Despensa' }} />
    </drawer.Navigator>
  );
}
