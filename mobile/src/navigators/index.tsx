import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DrawerNavigator } from './drawer';

export default function Navigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
