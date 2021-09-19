import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { DrawerNavigator } from './drawer';
import { StackNavigator } from './stack';

async function getLogged() {
  return await SecureStore.getItemAsync('ftttcc_logged') || 'n';
}

export default function Navigator() {
  let logged = false;

  useEffect(() => {
    async () => {
      logged = (await getLogged()) === 'y'
    }
  }, []);

  return (
    <NavigationContainer>
      {
        logged
          ? <DrawerNavigator />
          : <StackNavigator />
      }
    </NavigationContainer>
  );
}
