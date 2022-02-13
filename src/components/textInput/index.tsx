import React, { ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View
} from 'react-native';
import styles from './styles';

export interface ICustomTextInputProps extends TextInputProps {
  inputContainerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  rightIcon?: ReactNode;
}

export function CustomTextInput(props: ICustomTextInputProps) {
  let {
    inputContainerStyle,
    inputStyle,
    keyboardType,
    label,
    labelStyle,
    rightIcon,
    style,
    ...rest
  } = props;

  return (
    <View style={style}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          {...rest}
          keyboardType={keyboardType ?? 'default'}
          style={[styles.input, inputStyle]}
        />

        {rightIcon && <View style={[styles.icon, styles.rightIcon]}>{rightIcon}</View>}
      </View>
    </View>
  );
}
