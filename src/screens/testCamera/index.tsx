import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const permisionFunction = async () => {
        // here is how you can get the camera permission
        const cameraPermission = await Camera.requestPermissionsAsync();

        setCameraPermission(cameraPermission.status === 'granted');

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (
            imagePermission.status !== 'granted' &&
            cameraPermission.status !== 'granted'
        ) {
            alert('Permission for media access needed.');
        }
    };

    useEffect(() => {
        permisionFunction();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}
                />
            </View>

            <Button title={'Take Picture'} onPress={takePicture} />
            <Button title={'Gallery'} onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },
    button: {
        flex: 0.1,
        padding: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
});