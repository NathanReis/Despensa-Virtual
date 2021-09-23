import React from 'react';
import { TextInputProps } from 'react-native';
import { CustomTextInput } from '../textInput';

export function CustomNumberInput(props: TextInputProps) {
  return <CustomTextInput {...props} keyboardType='numeric' />
}
