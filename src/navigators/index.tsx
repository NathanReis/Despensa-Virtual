import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { DrawerNavigator } from './drawer';
import { StackNavigator } from './stack';

async function getLogged() {
  return await SecureStore.getItemAsync('ftttcc_logged') || 'n';
}

export default function Navigator() {
  let [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkLogged() {
      // Comment this (👇) line to always show Home
      setIsLogged((await getLogged()) === 'y')
    }

    checkLogged();
  }, []);

  return (
    <NavigationContainer>
      {
        isLogged
          ? <DrawerNavigator />
          : <StackNavigator />
      }
    </NavigationContainer>
  );
}
