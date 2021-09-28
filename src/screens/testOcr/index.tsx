import React from 'react';
import {
  Text
} from 'react-native';
import { SafeZoneScreen } from '../../components/safeZoneScreen';

import styles from './style';

export function TestOCR() {
  return (
    <SafeZoneScreen>
      <Text>OCR</Text>
    </SafeZoneScreen>
  );
}
