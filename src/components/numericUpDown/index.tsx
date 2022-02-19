import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { CustomButton } from '../button';
import { CustomNumberInput } from '../numberInput';
import styles from './styles';

interface INumericUpDownProps extends ViewProps {
  value: number;
  onDown: () => void;
  onUp: () => void;
}

export function NumericUpDown(props: INumericUpDownProps) {
  let {
    style,
    value,
    onDown,
    onUp,
    ...rest
  } = props;

  return (
    <View {...rest} style={[styles.container, style]}>
      <CustomButton style={styles.upDownButton} onPress={onDown}>
        <AntDesign name='minus' size={16} color='#000000' />
      </CustomButton>

      <CustomNumberInput
        editable={false}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={String(value)}
      />

      <CustomButton style={styles.upDownButton} onPress={onUp}>
        <AntDesign name='plus' size={16} color='#000000' />
      </CustomButton>
    </View>
  )
}
