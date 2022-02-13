import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import styles from './style';
import TestCamera from '../testCamera';
import mime from 'mime';
import { NumericUpDown } from '../../components/numericUpDown';
import { IProductModel } from './IProductModel';
import ocr from '../../services/ocr';
import { GreenButton } from '../../components/greenButton';
import { IProductDto } from './IProductDto';

export function Product() {
  function handleContinue() {
    navigation.navigate('BarcodeScan' as never);
  }

  function handleScan() {
    setScannedValidate(true);
  }

  function handleValidate(uri) {
    setScannedValidate(false);

    const newImageUri = 'file:///' + uri.split('file:/').join('');

    const formData = new FormData();
    formData.append('image', JSON.parse(JSON.stringify({ uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split('/').pop() })));

    getValidate(formData);
  }

  async function getValidate(formData) {
    try {
      const response = await ocr.post('/ocr/validate', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.length > 0)
        setValidate(response.data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1'))
      else
        Alert.alert('Error', 'Erro ao reconhecer a imagem');
      console.log(response.data)

    } catch (error) {
      Alert.alert('Error', 'Erro ao reconhecer a imagem');
      console.log(error.response.data)
    }
  }

  let navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IProductDto;
  // const routeParams = { barcode: '7891079013458' };
  let [product, setProduct] = useState<IProductModel>();
  const [validate, setValidate] = useState<string>('');
  const [scannedValidate, setScannedValidate] = useState<boolean>(false);

  useEffect(() => {
    setScannedValidate(false);

    api.get(`/products/barcode/${routeParams.barcode}`)
      .then(response => {
        setProduct(response.data as IProductModel);
        setValidate('');
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <SafeZoneScreen>
      <View style={styles.amountContainer}>
        <Text style={styles.productName}>{product?.name}</Text>

        <Image style={styles.image} source={require('../../../assets/logo.png')} />

        <NumericUpDown style={styles.upDown} />
      </View>

      <CustomTextInput
        style={styles.validate}
        label='Data de validade'
        defaultValue={validate}
        placeholder='xx/xx/xxxx'
        maxLength={10}
        rightIcon={<AntDesign
          style={styles.icon}
          name='camera'
          size={24}
          color='#5A6CF3'
          onPress={handleScan}
        />}
      />

      <GreenButton style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonContent}>Continuar</Text>
      </GreenButton>

      {
        !scannedValidate
          ? <></>
          : <TestCamera handleImg={handleValidate} />
      }
    </SafeZoneScreen>
  );
}
