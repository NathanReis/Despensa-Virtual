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
    try {
      if (response?.type === 'success') {
        let { authentication } = response;

        console.log('Dados da autenticação', authentication);

        LocalStorageHelper.set('logged', 'y'); // Missing await
        navigator.navigate('DrawerNavigator' as never);
      } else {
        console.log(response);
        Alert.alert('Error:', 'Error')
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error:', (err as Error).message)
    }
  }, [response]);

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
