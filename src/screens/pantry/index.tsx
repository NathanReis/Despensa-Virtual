import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { Loading } from '../../components/loading';
import api from '../../services/api';
import { IUserModel, User } from '../../storage/User';
import { IUserGroupModel } from '../../storage/UserGroup';
import { IMyProductModel } from '../product/IMyProductModel';
import styles from './styles';

export function Pantry() {

  let [products, setProducts] = useState<IMyProductModel[]>([]);
  let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
  let [defaultUserGroup, setDefaultUserGroup] = useState<IUserGroupModel>({} as IUserGroupModel);
  let [defaultUserGroupId, setDefaultUserGroupId] = useState<number>(0);
  let [searchedProducts, setSearchedProducts] = useState<IMyProductModel[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let navigator = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      async function load() {
        setIsLoading(true);
        let user = await User.getLoggedUser();
        setLoggedUser(user);

        let products;
        let defaultGroup;

        if (user.idDefaultUserGroup != null) {
          setDefaultUserGroupId(user.idDefaultUserGroup);
          products = await api.get<IMyProductModel[]>(`/my-products/${user.idDefaultUserGroup}`);
          defaultGroup = user.userGroupEntities.find(x => x.id == user.idDefaultUserGroup);
          setProducts(products.data);
          setSearchedProducts(products.data);
          setDefaultUserGroup(defaultGroup!);
          setDefaultUserGroupId(defaultGroup!.id);
        }
        setIsLoading(false);
      }

      load().catch(error => {
        console.log(error.response.data)
        // Alert.alert('Erro', JSON.stringify(error.response.data));
        setIsLoading(false);

      });
    }

  }, [isFocused]);

  async function handleChangeUserGroup(id: number) {

    setDefaultUserGroupId(id);
    try {
      let products = await api.get<IMyProductModel[]>(`/my-products/${id}`);
      setProducts(products.data);
      setSearchedProducts(products.data)
    } catch (error) {
      setProducts([])
      setSearchedProducts([])
    }

  }

  function handleSearchProduct(productName: string) {
    let possibleProducts = products.filter(x => x.productEntity.name.toLocaleLowerCase().indexOf(productName.toLocaleLowerCase()) > -1)

    if (possibleProducts.length > 0)
      setSearchedProducts(possibleProducts);
    else
      setSearchedProducts(products)
  }

  if (isLoading) {
    return <Loading />;
  }

  if (defaultUserGroupId == 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.pageTitle}>Você precisa registrar uma residência para visualizar seus produtos!</Text>
      </View>
    )
  }

  if (searchedProducts.length == 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.pageTitle}>Você não possui nenhum produto nessa despensa</Text>
        <SafeAreaView style={styles.userGroupContainer}>
          <View style={styles.pickerBorder}>
            <Picker
              selectedValue={defaultUserGroupId}
              onValueChange={(value, index) => handleChangeUserGroup(value)}
              mode='dropdown' // Android only
              style={styles.picker}
            >
              {loggedUser.userGroupEntities.map(x => (
                <Picker.Item key={x.id} label={x.name} value={x.id} />
              ))}
            </Picker>

          </View>

        </SafeAreaView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Sua Despensa</Text>
      <View style={styles.searchContainer}>
        <TextInput onChangeText={(productName) => handleSearchProduct(productName)} placeholder='Buscar Produto' style={styles.searchInput} />
        <CustomButton style={styles.menuItemButton}>
          <Image
            style={styles.iconContainer}
            source={require('../../../assets/searchIcon.png')}
          />
        </CustomButton>
      </View>

      <ScrollView>
        {searchedProducts.map(x =>
        (
          <View key={x.id} style={styles.productContainer}>
            <View style={styles.productImgContainer}>
              <Image style={styles.image} source={require('../../../assets/logo.png')} />
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{x.productEntity.name}</Text>
                <Text style={styles.productName}>Vence em: {x.validate}</Text>
              </View>
            </View>
            <Text>{x.amount} x</Text>
          </View>
        ))}
      </ScrollView>
      <SafeAreaView style={styles.userGroupContainer}>
        <View style={styles.pickerBorder}>
          <Picker
            selectedValue={defaultUserGroupId}
            onValueChange={(value, index) => handleChangeUserGroup(value)}
            mode='dropdown' // Android only
            style={styles.picker}
          >
            {loggedUser.userGroupEntities.map(x => (
              <Picker.Item key={x.id} label={x.name} value={x.id} />
            ))}
          </Picker>

        </View>

      </SafeAreaView>
    </View>
  )
}
