import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps
} from 'react-native';

import styles from './style';

export function CustomTextInput(props: TextInputProps) {
  let {
    keyboardType,
    style,
    ...rest
  } = props;

  let [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <TextInput
      {...rest}
      keyboardType={keyboardType ?? 'default'}
      style={[
        styles.input,
        isFocused && styles.inputFocused,
        style
      ]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
}
