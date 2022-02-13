import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import styles from './styles';

WebBrowser.maybeCompleteAuthSession();

export function Authentication() {
  let navigator = useNavigation();

  let [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.OAUTH_CLIENT_ID,
    redirectUri: process.env.OAUTH_REDIRECT_URI,
    responseType: 'token',
    scopes: ['email', 'profile']
  });

  useEffect(() => {
    async function authenticate() {
      try {
        if (response?.type === 'success') {
          await LocalStorageHelper.set('logged', 'y');
          navigator.navigate('DrawerNavigator' as never);
        } else {
          console.error({ _title: 'Authentication with error', response });

          if (response?.type === 'dismiss') {
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

    authenticate();
  }, [response]);

  return (
    <SafeZoneScreen style={styles.container}>
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
          style={styles.button}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.buttonContent}>Entrar</Text>
        </CustomButton>
      </View>
    </SafeZoneScreen>
  );
}
