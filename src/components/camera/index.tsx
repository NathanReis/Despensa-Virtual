import { Camera as ExpoCamera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { PermissionDenied } from '../permissionDenied';
import { WaitingPermission } from '../waitingPermission';
import styles from './styles';

interface ICameraProps {
  handleImg: Function;
}

export function Camera(props: ICameraProps) {
  let [camera, setCamera] = useState<ExpoCamera | null>(null);
  let [hasPermission, setHasPermission] = useState<boolean | null>(null);
  let [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    async function checkPermission() {
      let currentStatus = (await ExpoCamera.getCameraPermissionsAsync()).status;

      if (currentStatus !== 'granted') {
        setHasPermission(true);
      } else {
        let newStatus = (await ExpoCamera.requestCameraPermissionsAsync()).status;

        setHasPermission(newStatus === 'granted');
      }
    }

    checkPermission();
  }, []);

  if (hasPermission === null) {
    return <WaitingPermission />;
  } else if (!hasPermission) {
    return <PermissionDenied resource='Câmera' />;
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
