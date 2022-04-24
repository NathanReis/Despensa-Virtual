import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { BarcodeScan } from '../screens/barcodeScan';
import { Cart } from '../screens/cart';
import { ChartsMenu } from '../screens/chartsMenu';
import { ExpiredConsumedChart } from '../screens/expiredxConsumedChart';
import { Home } from '../screens/home';
import { MostConsumedChart } from '../screens/mostConsumedChart';
import { Pantry } from '../screens/pantry';
import { PantryUniqueProducts } from '../screens/pantryUniqueProducts';
import { Product } from '../screens/product';
import { UserGroup } from '../screens/userGroup';
import { UserGroups } from '../screens/userGroups';
import { DrawerContent } from './drawerContent'

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator
      screenOptions={{
        headerStyle: { height: 80 },
        sceneContainerStyle: { backgroundColor: '#FFFFFF' }
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <drawer.Screen
        component={Home}
        name='Home'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='home-outline'
              color={color}
              size={size} />
          )
        }}
      />
      <drawer.Screen
        component={BarcodeScan}
        name='BarcodeScan'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='barcode'
              color={color}
              size={size} />
          ),
          title: 'Novo produto'
        }}
      />
      <drawer.Screen
        component={Product}
        name='Product'
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Produto'
        }}
      />
      <drawer.Screen
        component={Cart}
        name='Cart'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='cart'
              color={color}
              size={size} />
          ),
          title: 'Carrinho'
        }}
      />
      <drawer.Screen
        component={Pantry}
        name='Pantry'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='food'
              color={color}
              size={size} />
          ),
          title: 'Meus produtos'
        }}
      />
      <drawer.Screen
        component={UserGroup}
        name='UserGroup'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-edit'
              color={color}
              size={size} />
          ),
          title: 'Nova despensa'
        }}
      />
      <drawer.Screen
        component={UserGroups}
        name='UserGroups'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-details'
              color={color}
              size={size} />
          ),
          title: 'Minhas despensas'
        }}
      />
      <drawer.Screen
        component={ChartsMenu}
        name='ChartsMenu'
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='chart-bar'
              color={color}
              size={size} />
          ),
          title: 'Gráficos'
        }}
      />
      <drawer.Screen
        component={PantryUniqueProducts}
        name='PantryUniqueProducts'
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Produtos'
        }}
      />
      <drawer.Screen
        component={ExpiredConsumedChart}
        name='ExpiredConsumedChart'
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Gráfico'
        }}
      />
      <drawer.Screen
        component={MostConsumedChart}
        name='MostConsumedChart'
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Gráfico'
        }}
      />
    </drawer.Navigator>
  );
}
