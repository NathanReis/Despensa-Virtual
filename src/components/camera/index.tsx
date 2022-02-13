import { Camera as ExpoCamera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import styles from './styles';

interface ICameraProps {
  handleImg: Function;
}

export function Camera(props: ICameraProps) {
  let [camera, setCamera] = useState<ExpoCamera | null>(null);
  let [hasPermission, setHasPermission] = useState<boolean>(false);
  let [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    async function checkPermission() {
      let currentStatus = (await ExpoCamera.getCameraPermissionsAsync()).status;

      if (currentStatus !== 'granted') {
        let newStatus = (await ExpoCamera.requestCameraPermissionsAsync()).status;

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

  if (!hasPermission) {
    return <Text>Precisamos de sua permissão para acessar Camera</Text>;
  }

  async function takePicture() {
    if (camera) {
      let data = await camera.takePictureAsync();
      setImageUri(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <ExpoCamera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={ExpoCamera.Constants.Type.back}
        />
      </View>

      <Button title='Tirar foto' onPress={takePicture} />
      {imageUri && <Button title='Avançar' onPress={() => props.handleImg(imageUri)} />}
    </View>
  );
}
