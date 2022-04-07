import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import api from '../../services/api';
import styles from './styles';

WebBrowser.maybeCompleteAuthSession();
export function Authentication() {
  async function handleNavigation() {

    // await LocalStorageHelper.set('loggedUser', JSON.stringify({
    //   "id": 1,
    //   "name": "Vitor Lupinetti",
    //   "email": "vi.lupinettii@gmail.com",
    //   "picture": "https://lh3.googleusercontent.com/a/AATXAJw6r3w2lIC7PRo42ufmF5aKI4Df5sesE0bnNLHM=s96-c",
    //   "idDefaultUserGroup": 10,
    //   "userGroupEntities": [
    //     {
    //       "id": 10,
    //       "name": "casa"
    //     },
    //     {
    //       "id": 11,
    //       "name": "praia"
    //     },
    //     {
    //       "id": 18,
    //       "name": "despensa legal"
    //     },
    //     {
    //       "id": 25,
    //       "name": "loloolo"
    //     },
    //     {
    //       "id": 26,
    //       "name": "Casa 2"
    //     }
    //   ],
    //   "defaultUserGroupEntity": {
    //     "id": 10,
    //     "name": "casa"
    //   }
    // }));
    // await LocalStorageHelper.set('logged', 'y');
    // navigator.navigate('DrawerNavigator' as never);
    // return;

    const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    const REDIRECT_URI = AuthSession.makeRedirectUri({ path: process.env.OAUTH_REDIRECT_URI, useProxy: true });
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('email profile');
    const OAUTH2_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    try {
      let response = await AuthSession.startAsync({ authUrl: OAUTH2_URL });

      if (response.type === 'success') {
        let user = (await api.post('/users/login-google', { token: response.params['access_token'] })).data;
        await LocalStorageHelper.set('loggedUser', JSON.stringify(user));
        await LocalStorageHelper.set('logged', 'y');
        navigator.navigate('DrawerNavigator' as never);
      } else {
        console.error({ _title: 'Authentication with error', response });

        if (response.type === 'dismiss') {
          // TO DO: Delete this condition after fix this problem
          await LocalStorageHelper.set('logged', 'n');
          Alert.alert('Bug', 'Mesmo conseguindo se autenticar, não é obtido sucesso');
        } else {
          await LocalStorageHelper.set('logged', 'n');
          Alert.alert('Erro', 'Não foi possível fazer autenticação.');
        }
      }
    } catch (exception) {
      console.error({ _title: 'Authentication threw exception', exception });
      Alert.alert('Erro', (exception as Error).message)
    }
  }

  let navigator = useNavigation();

  return (
    <SafeZoneScreen backgroundColor='#FFF7F7' isWithoutHeader={true}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/logo.png')}
        />

        <Text style={styles.welcome}>Seja bem-vindo</Text>
        <Text style={styles.description}>
          Escaneie seus produtos e comece a{'\n'}
          reduzir o desperdício em sua residência
        </Text>

        <CustomButton style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonContent}>Entrar</Text>
        </CustomButton>
      </View>
    </SafeZoneScreen>
  );
}
