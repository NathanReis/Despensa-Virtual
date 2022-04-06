import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
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
  let [selectedFilter, setSelectedFilter] = useState<number>(-1);
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
          setDefaultUserGroupId(user.idDefaultUserGroup);
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

  function handleSortByAmount() {
    let possibleProducts = products.sort(function (a, b) { return b.amount - a.amount });
    setSearchedProducts([...possibleProducts]);
    setSelectedFilter(0);
  }

  function handleSortByValidate() {
    let possibleProducts = products.sort(function (a, b) { return new Date(a.validate).getTime() - new Date(b.validate).getTime() })
    setSearchedProducts([...possibleProducts]);
    setSelectedFilter(1);
  }
  function handleFilterExpireds() {
    let possibleProducts = products.filter(x => new Date(x.validate) <= new Date())
    setSearchedProducts([...possibleProducts]);
    setSelectedFilter(2);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (defaultUserGroupId == 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.pageTitle}>Você precisa registrar uma despensa para visualizar seus produtos!</Text>
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
      <Text>Ordenar por</Text>

      <View style={styles.sortButtonsContainer}>
        <CustomButton onPress={handleSortByAmount} style={(selectedFilter === 0 ? styles.sortButtonSelected : styles.sortButton)}>
          <Text style={(selectedFilter === 0 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Quantidade</Text>
        </CustomButton>
        <CustomButton onPress={handleSortByValidate} style={(selectedFilter === 1 ? styles.sortButtonSelected : styles.sortButton)}>
          <Text style={(selectedFilter === 1 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Validade</Text>
        </CustomButton>
        <CustomButton onPress={handleFilterExpireds} style={(selectedFilter === 2 ? styles.sortButtonSelected : styles.sortButton)}>
          <Text style={(selectedFilter === 2 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Vencidos</Text>
        </CustomButton>
      </View>

      <FlatList
        data={searchedProducts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productImgContainer}>
              <Image style={styles.image} source={require('../../../assets/logo.png')} />
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{item.productEntity.name}</Text>
                <Text style={styles.productName}>Vence em: {item.validate}</Text>
                <Text style={styles.productName}>Status: {item.status}</Text>
              </View>
            </View>
            <Text>{item.amount} x</Text>
          </View>
        )}
      />

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
