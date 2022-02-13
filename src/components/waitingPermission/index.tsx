import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export function WaitingPermission() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Aguardando permissão...</Text>
    </View>
  );
}
