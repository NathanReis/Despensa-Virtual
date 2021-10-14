import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  View
} from 'react-native';
import { CustomButton } from '../../components/button';
import { CustomNumberInput } from '../../components/numberInput';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import styles from './style';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import TestCamera from '../testCamera';
import mime from "mime";

interface Params {
  codebar: string;
}


export function Product() {
  function handleSave() {
    Alert.alert('Saved', 'Your product was saved');
  }

  function handleScan() {
    setScannedValidate(true);
  }


  function handleValidate(uri) {
    setScannedValidate(false);


    const newImageUri = "file:///" + uri.split("file:/").join("");

    const formData = new FormData();
    formData.append('image', JSON.parse(JSON.stringify({ uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() })));

    getValidate(formData);

  }

  async function getValidate(formData) {
    // const response = await api.post(data);
    try {
      const response = await api.post('/test-ocr/validate', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.length > 0)
        setValidate(response.data[0])
      else
        Alert.alert('Error', 'Erro ao reconhecer a imagem');
      console.log(response.data)

    } catch (error) {
      Alert.alert('Error', 'Erro ao reconhecer a imagem');
      console.log(error.response.data)
    }
  }

  const route = useRoute();
  const routeParams = route.params as Params;
  const [description, setDescription] = useState<string>('');
  const [validate, setValidate] = useState<string>('');
  const [scannedValidate, setScannedValidate] = useState<Boolean>(false);
  useEffect(() => {
    setScannedValidate(false);
    console.log(routeParams);
    api.get(`products/codebar/${routeParams.codebar}`).then(response => {
      setDescription(response.data.productName);
      setValidate('')
    })
  }, [routeParams])

  return (
    <View style={{ flex: 1 }}>
      {!scannedValidate ?
        <SafeZoneScreen>
          <View style={styles.form}>
            <Text style={styles.formTitle}>{'Product'}</Text>

            <CustomTextInput placeholder='Codebar' value={routeParams.codebar} />
            <CustomTextInput placeholder='Description' value={description} />
            <CustomNumberInput placeholder='Amount' />
            <CustomTextInput value={validate} editable={false} placeholder='Validate dd/mm/yyyy' />
            <View ><TouchableOpacity onPress={handleScan} style={[styles.iconContainer, styles.button]}><Text >Escanear validade</Text><AntDesign style={styles.icon} name="camera" size={24} color="black" /></TouchableOpacity></View>
            <CustomButton title='Save' onPress={handleSave} />
          </View>
        </SafeZoneScreen>
        :
        <TestCamera handleImg={handleValidate} />
      }

    </View>
  );
}
