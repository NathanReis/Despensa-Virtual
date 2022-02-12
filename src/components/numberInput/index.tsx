import React from 'react';
import { CustomTextInput, ICustomTextInputProps } from '../textInput';

interface ICustomNumberInputProps extends ICustomTextInputProps { }

export function CustomNumberInput(props: ICustomNumberInputProps) {
  return <CustomTextInput {...props} keyboardType='numeric' />
}
