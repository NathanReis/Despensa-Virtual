import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Alert,
  Image,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import styles from './style';

WebBrowser.maybeCompleteAuthSession();

export function Authentication() {
  let navigation = useNavigation();

  async function handleNavigation() {
    const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('email profile');

    const OAUTH2_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    try {
      let response = await AuthSession.startAsync({ authUrl: OAUTH2_URL });

      console.log(response);

      await LocalStorageHelper.set('logged', 'y');
      navigation.navigate('DrawerNavigator' as never);
    } catch (err) {
      console.log(err);
      Alert.alert('Error:', (err as Error).message)
    }
  }

  return (
    <SafeZoneScreen
      style={styles.container}
    >
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={require('../../../assets/logo.png')}
        />

        <Text style={styles.welcome}>Seja bem-vindo</Text>
        <Text style={styles.description}>
          Escaneie seus produtos e comece a{'\n'}
          reduzir o desperdício em sua residência
        </Text>

        <CustomButton
          onPress={handleNavigation}
          title='Entrar'
          style={styles.button}
        />
      </View>
    </SafeZoneScreen>
  );
}
