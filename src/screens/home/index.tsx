import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import styles from './style';

export function Home() {
  const navigation = useNavigation();

  async function handleNavigation() {
    await LocalStorageHelper.set('logged', 'y');
    navigation.navigate('DrawerNavigator');
  }

  return (
    <SafeZoneScreen>
      <View style={styles.main}>
        <Text style={styles.title}>Conecte-se e comece a{'\n'}reduzir seus desperdícios</Text>
        <Image style={styles.image}
          source={require('../../../assets/logo.png')} />
        <CustomButton onPress={handleNavigation} title='Entrar' style={styles.button} />
      </View>
    </SafeZoneScreen>
  );
}
