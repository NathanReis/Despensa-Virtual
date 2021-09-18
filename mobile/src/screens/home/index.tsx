import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
  Image
} from 'react-native';
import { CustomButton } from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

export default function Home() {

  const navigation = useNavigation();
  function handleNavigation() {
    navigation.navigate('Navigator');
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