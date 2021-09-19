import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import styles from './style';

export function Home() {
  const navigation = useNavigation();

  async function handleNavigation() {
    await SecureStore.setItemAsync('ftttcc_logged', 'y');
    navigation.navigate('DrawerNavigator');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.main}>
          <Text style={styles.title}>Conecte-se e comece a{'\n'}reduzir seus desperdícios</Text>
          <Image style={styles.image}
            source={require('../../../assets/logo.png')} />
          <CustomButton onPress={handleNavigation} title='Entrar' style={styles.button} />
          {/* <CustomButton title='Entrar' style={{ backgroundColor: '#ADD8E6', width: 200 }} /> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
