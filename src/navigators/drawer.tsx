import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Product } from '../screens/product';
import TestCamera from '../screens/testCamera';
import { BarcodeScan } from '../screens/barcodeScan';
import { SamplePickImageGallery } from '../screens/samplePickImageGallery';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen component={BarcodeScan} name='BarcodeScan' />
      <drawer.Screen component={Product} name='Product 1' />
      <drawer.Screen component={TestCamera} name='TestCamera' />
      <drawer.Screen component={SamplePickImageGallery} name='Imagem galeria' />
    </drawer.Navigator>
  );
}
