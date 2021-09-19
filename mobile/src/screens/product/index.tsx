import React from 'react';
import {
  Alert,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import { CustomNumberInput } from '../../components/numberInput';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';

import styles from './style';

export function Product() {
  function handleSave() {
    Alert.alert('Saved', 'Your product was saved');
  }

  return (
    <SafeZoneScreen>
      <View style={styles.form}>
        <Text style={styles.formTitle}>{'Product'}</Text>

        <CustomTextInput placeholder='Description' />
        <CustomNumberInput placeholder='Amount' />
        <CustomTextInput placeholder='Validate' />

        <CustomButton title='Save' onPress={handleSave} />
      </View>
    </SafeZoneScreen>
  );
}
