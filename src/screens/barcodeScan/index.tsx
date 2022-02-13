import { useNavigation } from '@react-navigation/core';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PermissionDenied } from '../../components/permissionDenied';
import { WaitingPermission } from '../../components/waitingPermission';
import styles from './styles';

export function BarcodeScan() {
  let [hasPermission, setHasPermission] = useState<boolean | null>(null);
  let [scanned, setScanned] = useState<boolean>(false);
  let navigator = useNavigation();

  useEffect(() => {
    async function checkPermission() {
      let currentStatus = (await BarCodeScanner.getPermissionsAsync()).status;

      if (currentStatus === 'granted') {
        setHasPermission(true);
      } else {
        let newStatus = (await BarCodeScanner.requestPermissionsAsync()).status;

        setHasPermission(newStatus === 'granted');
      }
    }

    checkPermission();
  }, []);

  function handleBarCodeScanned({ data }: BarCodeScannerResult) {
    setScanned(true);
    navigator.navigate('Product' as never, { barcode: data } as never);
  };

  if (hasPermission === null) {
    return <WaitingPermission />;
  } else if (!hasPermission) {
    return <PermissionDenied resource='Câmera' />;
  }

  return (
    <View style={styles.container2}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
      >
        <BarcodeMask
          width={250}
          height={250}
          outerMaskOpacity={0.5}
          showAnimatedLine={false}
        />
        {scanned && <Button title='Clique para escanear novamente' onPress={() => setScanned(false)} />}
        <View style={styles.scannerGrid}>
          <View style={styles.topbar}>
            <TouchableOpacity />

            <TouchableOpacity style={styles.flipText} >

            </TouchableOpacity>
          </View>

          <View style={styles.bottomBar}>
            <Text style={styles.instructions}>
              Posicione o código de barras dentro da área acima para escanear o produto
            </Text>
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}
