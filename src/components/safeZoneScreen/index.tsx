import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import styles from './style';

interface ISafeZoneScreenProps extends SafeAreaViewProps {
  children: ReactNode;
}

export function SafeZoneScreen(props: ISafeZoneScreenProps) {
  let {
    children,
    style,
    ...rest
  } = props;

  return (
    <SafeAreaView
      {...rest}
      style={[styles.container, style]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
