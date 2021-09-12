import React from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import { CustomNumberInput } from '../../components/numberInput';
import { CustomTextInput } from '../../components/textInput';

import styles from './style';

export function Product() {
  function handleSave() {
    Alert.alert('Saved', 'Your product was saved');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.form}>
              <Text style={styles.formTitle}>{'Product'}</Text>

              <CustomTextInput placeholder='Description' />
              <CustomNumberInput placeholder='Amount' />
              <CustomTextInput placeholder='Validate' />

              <CustomButton title='Save' onPress={handleSave} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
