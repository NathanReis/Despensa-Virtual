import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}
