import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

export function BarcodeScan() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function checkPermission() {
      let currentStatus = (await BarCodeScanner.getPermissionsAsync()).status;

      if (currentStatus !== 'granted') {
        let newStatus = (await BarCodeScanner.requestPermissionsAsync()).status;

        if (newStatus !== 'granted') {
          Alert.alert('Você precisa permitir acesso à câmera para usar este app');
        } else {
          setHasPermission(true);
        }
      } else {
        setHasPermission(true);
      }
    }

    checkPermission();
  }, []);

  function handleBarCodeScanned({ data }: BarCodeScannerResult) {
    setScanned(true);
    navigation.navigate('Product 1' as never, { barcode: data } as never);
  };

  if (!hasPermission) {
    return <Text>Precisamos de sua permissão</Text>;
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
        {scanned && <Button title={'Clique para escanear novamente'} onPress={() => setScanned(false)} />}
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
