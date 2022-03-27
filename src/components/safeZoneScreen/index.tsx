import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import styles from './styles';

interface ISafeZoneScreenProps {
  backgroundColor?: string;
  children: ReactNode;
  isWithoutHeader?: boolean;
  isWithoutScroll?: boolean;
}

export function SafeZoneScreen(props: ISafeZoneScreenProps) {
  let { backgroundColor, children, isWithoutHeader, isWithoutScroll } = props;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {
            isWithoutScroll
              ? (
                <View
                  style={[
                    styles({ backgroundColor, isWithoutHeader }).container,
                    styles({ isWithoutHeader }).containerWithoutScroll,
                    { backgroundColor }
                  ]}
                >
                  {children}
                </View>
              )
              : (
                <ScrollView
                  contentContainerStyle={[
                    styles({ backgroundColor, isWithoutHeader }).container,
                    { backgroundColor }
                  ]}
                >
                  {children}
                </ScrollView>
              )
          }
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
