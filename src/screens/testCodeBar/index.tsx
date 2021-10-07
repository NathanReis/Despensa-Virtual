import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from "react-native-barcode-mask";
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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