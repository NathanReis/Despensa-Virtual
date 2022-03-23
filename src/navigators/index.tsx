import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LocalStorageHelper } from '../helpers/LocalStorageHelper';
import { DrawerNavigator } from './drawer';
import { StackNavigator } from './stack';

async function getLogged() {
  return await LocalStorageHelper.get('logged') || 'n';
}

export default function Navigator() {
  let [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkLogged() {
      // Comment this (👇) line to always show Authentication
      setIsLogged((await getLogged()) === 'n')
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
