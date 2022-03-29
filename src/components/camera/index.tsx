import { Entypo } from '@expo/vector-icons';
import { Camera as ExpoCamera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../button';
import { PermissionDenied } from '../permissionDenied';
import { WaitingPermission } from '../waitingPermission';
import styles from './styles';

interface ICameraProps {
  handleImg: Function;
}

export function Camera(props: ICameraProps) {
  let [camera, setCamera] = useState<ExpoCamera | null>(null);
  let [hasPermission, setHasPermission] = useState<boolean | null>(null);

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

      props.handleImg(data.uri);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <ExpoCamera
        style={styles.camera}
        ref={ref => setCamera(ref)}
        type={ExpoCamera.Constants.Type.back}
      />

      <CustomButton style={styles.button} onPress={takePicture}>
        <Entypo name='circle' size={40} color='#FFFFFF' />
      </CustomButton>
    </View>
  );
}
