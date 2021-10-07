import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { CustomButton } from '../../components/button';
import { SafeZoneScreen } from '../../components/safeZoneScreen';

import styles from './style';

export function SamplePickImageGallery() {
  let [image, setImage] = useState<string>();

  useEffect(() => {
    async function checkPermission() {
      let currentStatus = (await ImagePicker.getMediaLibraryPermissionsAsync()).status;

      if (currentStatus !== 'granted') {
        let newStatus = (await ImagePicker.requestMediaLibraryPermissionsAsync()).status;

        if (newStatus !== 'granted') {
          alert('You need to permit that this app access you images');
        }
      }
    }

    checkPermission();
  }, []);

  async function handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <SafeZoneScreen>
      {
        image
        && <Image
          style={styles.image}
          source={{ uri: image }}
        />
      }
      <CustomButton
        title='Selecionar imagem'
        onPress={handlePickImage}
      />
    </SafeZoneScreen>
  );
}
