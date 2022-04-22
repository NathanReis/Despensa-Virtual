import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import { CustomButton } from '../../components/button';
import api from '../../services/api';
import { IUserModel, User } from '../../storage/User';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Loading } from '../../components/loading';
import { GreenButton } from '../../components/greenButton';

interface IUniqueProductDTO {
  id: number,
  name: string
}
export function PantryUniqueProducts() {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [products, setProducts] = useState<IUniqueProductDTO[]>([]);
  let [searchedProducts, setSearchedProducts] = useState<IUniqueProductDTO[]>([]);
  let [defaultUserGroupId, setDefaultUserGroupId] = useState<number>(0);
  let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
  let isFocused = useIsFocused();
  let navigator = useNavigation();


  useEffect(() => {
    if (isFocused) {
      clearFields();
      try {
        loadData();
      } catch (error) {
        setIsLoading(false);
      }
    }
  }, [isFocused]);

  function clearFields() {
    setLoggedUser({} as IUserModel);
    setDefaultUserGroupId(0);
    setProducts([]);
  }
  async function loadData() {
    setIsLoading(true);
    let loggedUser = await User.getLoggedUser();
    setLoggedUser(loggedUser);
    let response;
    if (loggedUser.idDefaultUserGroup != null && loggedUser.userGroupEntities.length > 0) {
      setDefaultUserGroupId(loggedUser.idDefaultUserGroup)
      response = await api.get<IUniqueProductDTO[]>(`/products/unique/user-group/${loggedUser.idDefaultUserGroup}`);
      setProducts(response.data);
      setSearchedProducts(response.data);
    }
    setIsLoading(false);
  }

  function handleSearchProduct(productName: string) {
    let possibleProducts = products.filter(x => x.name.toLocaleLowerCase().indexOf(productName.toLocaleLowerCase()) > -1)

    if (possibleProducts.length > 0)
      setSearchedProducts(possibleProducts);
    else
      setSearchedProducts(products)
  }


  async function handleChangeUserGroup(id: number) {

    setDefaultUserGroupId(id);
    try {
      let products = await api.get<IUniqueProductDTO[]>(`/products/unique/user-group/${id}`);
      setProducts(products.data);
      setSearchedProducts(products.data)
    } catch (error) {
      setProducts([])
      setSearchedProducts([])
    }
  }
  async function handleNavigate(id: number) {
    navigator.navigate('ExpiredConsumedChart' as never, { idProduct: id, idUserGroup: defaultUserGroupId } as never);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (loggedUser.userGroupEntities.length == 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.pageTitle}>Você precisa registrar uma despensa para acessar essa funcionalidade!</Text>
        <GreenButton onPress={() => navigator.navigate('UserGroup' as never)}>
          <Text style={{ color: 'white' }}>Nova despensa</Text>
        </GreenButton>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ height: '20%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.searchContainer}>
          <TextInput onChangeText={(productName) => handleSearchProduct(productName)} placeholder='Buscar Produto' style={styles.searchInput} />
          <CustomButton style={styles.menuItemButton}>
            <Image
              source={require('../../../assets/searchIcon.png')}
            />
          </CustomButton>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        {searchedProducts.map(item => (
          <View key={item.id} style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <GreenButton onPress={() => handleNavigate(item.id)}>
              <Text style={{ color: 'white' }}>Analisar</Text>
            </GreenButton>
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
