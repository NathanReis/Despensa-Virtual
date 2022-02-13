import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface IPermissionDeniedProps {
  resource: string;
}

export function PermissionDenied(props: IPermissionDeniedProps) {
  let {
    resource
  } = props;

  return (
    <View style={styles.container}>
      <AntDesign style={styles.icon} name='warning' size={32} color='yellow' />
      <Text style={styles.message}>É necessário que você nos de permissão para acessar a {resource}.</Text>
    </View>
  );
}
