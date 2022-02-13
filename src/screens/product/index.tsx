import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import mime from 'mime';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Camera } from '../../components/camera';
import { GreenButton } from '../../components/greenButton';
import { NumericUpDown } from '../../components/numericUpDown';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import api from '../../services/api';
import ocr from '../../services/ocr';
import { IProductDto } from './IProductDto';
import { IProductModel } from './IProductModel';
import styles from './styles';

export function Product() {
  function handleContinue() {
    navigator.navigate('BarcodeScan' as never);
  }

  function handleScan() {
    setScannedValidate(true);
  }

  function handleValidate(uri: string) {
    setScannedValidate(false);

    let newImageUri = 'file:///' + uri.split('file:/').join('');

    let formData = new FormData();
    formData.append(
      'image',
      JSON.parse(JSON.stringify({
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop()
      }))
    );

    getValidate(formData);
  }

  async function getValidate(formData: FormData) {
    try {
      let response = await ocr.post(
        '/ocr/validate',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      let data: any = response.data;
      let status = response.status;

      if (status === 200 && data.length > 0) {
        setValidate(data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1'))
      } else if (status === 400) {
        Alert.alert('Erro', data.error.join('\n'));
      } else {
        Alert.alert('Erro', 'Validade não pode ser extraída.');
      }
    } catch {
      Alert.alert('Erro', 'Erro inesperado.');
    }
  }

  let [product, setProduct] = useState<IProductModel>();
  let [validate, setValidate] = useState<string>('');
  let [scannedValidate, setScannedValidate] = useState<boolean>(false);
  let navigator = useNavigation();
  let route = useRoute();
  let routeParams = route.params as IProductDto;
  // let routeParams = { barcode: '7891079013458' };

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
          : <Camera handleImg={handleValidate} />
      }
    </SafeZoneScreen>
  );
}
