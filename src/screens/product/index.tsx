import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { MaskedTextInput } from "react-native-mask-text";
import mime from 'mime';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { GreenButton } from '../../components/greenButton';
import { Loading } from '../../components/loading';
import { NumericUpDown } from '../../components/numericUpDown';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import { WaitingPermission } from '../../components/waitingPermission';
import { DateHelper } from '../../helpers/DateHelper';
import api from '../../services/api';
import ocr from '../../services/ocr';
import { Purchase } from '../../storage/Purchase';
import { IProductDto } from './IProductDto';
import { IProductModel } from './IProductModel';
import styles from './styles';
import { OrangeButton } from '../../components/orangeButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Product() {
  async function checkCameraPermission() {
    let currentStatus = (await ImagePicker.getCameraPermissionsAsync()).status;

    if (currentStatus === 'granted') {
      setHasCameraPermission(true);
    } else {
      let newStatus = (await ImagePicker.requestCameraPermissionsAsync()).status;

      setHasCameraPermission(newStatus === 'granted');
    }
  }

  async function loadData() {
    setAmount(0);
    setValidate('');

    let localResponse = await Purchase.findProductByBarcode(routeParams.barcode);
    let productFound = localResponse;

    if (productFound) {
      setValidate(productFound.validate);
      setAmount(productFound.amount);

      Alert.prompt('Encontrei localmente');
    } else {
      let apiResponse = await api.get(`/products/barcode/${routeParams.barcode}`);
      productFound = apiResponse.data as IProductModel;

      Alert.prompt('Encontrei remotamente');
    }

    setProduct(productFound);

    try {
      await axios.get(`http://www.eanpictures.com.br:9000/api/gtin/${routeParams.barcode}`)
      setHasImage(true)
    } catch {
      setHasImage(false)
    }
  }

  async function handleUseEffect() {
    setIsLoading(true);

    await checkCameraPermission();

    try {
      await loadData();
    } catch (error: any) {
      console.log(error.response.data.error)
      Alert.alert('Erro', 'Produto não foi encontrado');
      navigator.navigate('BarcodeScan' as never);
    }

    setIsLoading(false);
  }

  async function handleOpenCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0.3
    });

    if (!result.cancelled) {
      await getValidate(result.uri);
    }
  }

  async function getValidate(uri: string) {
    setDisabledButton(true);
    try {
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
      let response = await ocr.post(
        '/ocr/validate',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      let data: any = response.data;
      let status = response.status;

      if (status === 200 && data.length > 0) {
        setValidate(DateHelper.convertFromStoreToViewFormat(data));
      } else if (status === 400) {
        Alert.alert('Erro', data.error.join('\n'));
      } else {
        Alert.alert('Erro', 'Validade não pode ser extraída.');
      }
    } catch {
      Alert.alert('Erro', 'Erro inesperado.');
    }
    finally {
      setDisabledButton(false);
    }
  }

  async function saveCurrentData() {
    product!.barcode = routeParams.barcode;
    product!.validate = validate;
    product!.amount = amount;

    await Purchase.addProduct(product!);
  }

  async function validateFields() {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!(date_regex.test(validate))) {
      Alert.alert('Erro', 'Data inválida')
      return false;
    }
    if (amount <= 0) {
      Alert.alert('Erro', 'Selecione ao menos uma unidade')
      return false;
    }
    return true;
  }

  async function handleContinue() {
    let isValid = await validateFields();
    if (isValid == true) {
      await saveCurrentData();
      navigator.navigate('BarcodeScan' as never);
    }
  }

  async function handleCart() {
    let isValid = await validateFields();
    if (isValid == true) {
      await saveCurrentData();
      navigator.navigate('Cart' as never);
    }
  }

  let [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  let [hasImage, setHasImage] = useState<boolean>(false);
  let [product, setProduct] = useState<IProductModel>();
  let [amount, setAmount] = useState<number>(0);
  let [validate, setValidate] = useState<string>('');
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [disabledButton, setDisabledButton] = useState<boolean>(false);
  let navigator = useNavigation();
  let route = useRoute();
  let routeParams = route.params
    ? route.params as IProductDto
    : { barcode: '7891079013458' };
  // : { barcode: '7896213002138' };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleUseEffect();
    }
  }, [isFocused]);

  if (hasCameraPermission === null) {
    return <WaitingPermission />;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen>
      <View style={styles.amountContainer}>
        <Text style={styles.productName}>{product?.name}</Text>

        {hasImage &&
          <Image
            style={styles.image}
            source={{ uri: `http://www.eanpictures.com.br:9000/api/gtin/${routeParams.barcode}` }}
          />
          ||
          <Image
            style={styles.image}
            source={require('../../../assets/logo.png')}
          />
        }

        <NumericUpDown
          style={styles.upDown}
          value={amount}
          onDown={() => setAmount(--amount)}
          onUp={() => setAmount(++amount)}
        />
      </View>

      <CustomTextInput
        style={styles.validate}
        label='Data de validade'
        placeholder='xx/xx/xxxx'
        value={validate}
        maxLength={10}
        rightIcon={
          hasCameraPermission &&
          <AntDesign
            style={styles.icon}
            name='camera'
            size={24}
            color='#5A6CF3'
            onPress={handleOpenCamera} />}
        onChangeText={(text) => setValidate(text)}
      />

      {/* <View style={styles.validate}>
        <Text style={styles.label}>Data de validade</Text>
        <View style={styles.inputContainer}>
          <MaskedTextInput
            mask="99/99/9999"
            value={validate}
            onChangeText={(text) => setValidate(text)}
            // placeholder='xx/xx/xxxx'
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={[styles.iconRight, styles.rightIcon]}>
            <AntDesign
              style={styles.icon}
              name='camera'
              size={24}
              color='#5A6CF3'
              onPress={handleOpenCamera}
            />
          </View>
        </View>

      </View> */}


      <GreenButton disabled={disabledButton} style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonContent}>Escanear outro produto</Text>
        <Icon
          name="barcode"
          color={'white'}
          size={30}
        />
      </GreenButton>

      <OrangeButton disabled={disabledButton} onPress={handleCart}>
        <Text style={styles.buttonContent}>Ir para o carrinho</Text>
        <Icon
          name="cart"
          color={'white'}
          size={30}
        />
      </OrangeButton>

    </SafeZoneScreen>
  );
}
