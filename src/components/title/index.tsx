import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface ITitleProps {
  content: string;
}

export function Title(props: ITitleProps) {
  let { content } = props;

  return <Text style={styles.title}>{content}</Text>;
}
