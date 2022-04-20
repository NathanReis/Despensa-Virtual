import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import * as Linking from 'expo-linking';
import Checkbox from 'expo-checkbox';
import api from '../../services/api';
import styles from './styles';
import { Loading } from '../../components/loading';

WebBrowser.maybeCompleteAuthSession();
export function Authentication() {
  let [userAccepted, setUserAccepted] = useState<boolean>(false);
  let [userAlreadyAccepted, setUserAlreadyAccepted] = useState<boolean>(false);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      let userAccepted = await LocalStorageHelper.get('dv-userAccepted');

      if (userAccepted && userAccepted != null) {
        setUserAlreadyAccepted(JSON.parse(userAccepted))
        console.log(userAccepted);
      }
      setIsLoading(false);
    }
    loadData();
  }, [])

  async function handleNavigation() {

    if (userAlreadyAccepted == false && userAccepted == false) {
      Alert.alert('Atenção', 'Para entrar você deve aceitar nossos termos de uso e privacidade.');
      return;
    }

    const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    const REDIRECT_URI = AuthSession.makeRedirectUri({ path: process.env.OAUTH_REDIRECT_URI, useProxy: true });
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('email profile');
    const OAUTH2_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    let response;
    try {
      response = await AuthSession.startAsync({ authUrl: OAUTH2_URL });

      if (response.type === 'success') {
        let user = (await api.post('/users/login-google', { token: response.params['access_token'] })).data;
        await LocalStorageHelper.set('loggedUser', JSON.stringify(user));
        await LocalStorageHelper.set('logged', 'y');
        navigator.navigate('DrawerNavigator' as never);
      } else {
        console.error({ _title: 'Authentication with error', response });
        await LocalStorageHelper.set('logged', 'n');
        Alert.alert('Erro', 'Não foi possível fazer autenticação.');
      }
    } catch (exception) {
      console.log(response)
      console.error({ _title: 'Authentication threw exception', exception });
      Alert.alert('Erro', (exception as Error).message)
    }
  }

  async function handleAcceptPrivacy() {
    setUserAccepted(!userAccepted);
    await LocalStorageHelper.set('dv-userAccepted', String(!userAccepted));
    console.log(!userAccepted);
  }

  function handleOpenPrivacy() {
    const privacyUrl = 'https://nathanreis.github.io/Despensa-Virtual/privacy/';
    Linking.openURL(privacyUrl);
  }

  let navigator = useNavigation();

  if (isLoading) {
    return <Loading />;
  }

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

        {
          userAlreadyAccepted == false && <>
            <View style={styles.checkboxContainer}>
              <Checkbox value={userAccepted} onValueChange={handleAcceptPrivacy} />

              <Text
                style={styles.checkboxLabel}
                onPress={handleAcceptPrivacy}
              >
                LI E ACEITO
              </Text>
            </View>
            <View>
              <Text
                style={styles.privacyTextLabel}
                onPress={handleOpenPrivacy}
              >
                Verifique nossos termos de uso
              </Text>
            </View>
          </>

        }




        <CustomButton style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonContent}>Entrar</Text>
        </CustomButton>
      </View>
    </SafeZoneScreen>
  );
}
