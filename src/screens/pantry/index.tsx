import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/button';
import { GreenButton } from '../../components/greenButton';
import { Loading } from '../../components/loading';
import { CustomModal } from '../../components/modal';
import { NumericUpDown } from '../../components/numericUpDown';
import { OrangeButton } from '../../components/orangeButton';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import { DateHelper } from '../../helpers/DateHelper';
import api from '../../services/api';
import { User } from '../../storage/User';
import { IUserGroupModel } from '../../storage/UserGroup';
import { IMyProductModel } from '../product/IMyProductModel';
import styles from './styles';

export function Pantry() {
  let [products, setProducts] = useState<IMyProductModel[]>([]);
  let [defaultUserGroupId, setDefaultUserGroupId] = useState<number>(0);
  let [modalVisible, setModalVisible] = useState<boolean>(false);
  let [selectedFilter, setSelectedFilter] = useState<number>(-1);
  let [searchedProducts, setSearchedProducts] = useState<IMyProductModel[]>([]);
  let [selectedProduct, setSelectedProduct] = useState<IMyProductModel>();
  let [selectedStatus, setSelectedStatus] = useState<string>();
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [userGroups, setUserGroups] = useState<IUserGroupModel[]>([]);
  let [amountToUpdate, setAmount] = useState<number>(1);

  let isFocused = useIsFocused();
  let navigator = useNavigation();

  useEffect(() => {
    if (isFocused) {
      async function load() {
        setIsLoading(true);

        let user = await User.getLoggedUser();
        setUserGroups(user.userGroupEntities);

        if (user.idDefaultUserGroup) {
          setDefaultUserGroupId(user.idDefaultUserGroup);

          await loadProducts(user.idDefaultUserGroup);
        }

        setIsLoading(false);
      }

      load().catch(error => {
        console.log(error.response.data)
        setIsLoading(false);
      });
    }
  }, [isFocused]);

  async function handleChangeUserGroup(id: number) {
    setDefaultUserGroupId(id);
    setSelectedFilter(-1);

    await loadProducts(id);
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

  async function loadProducts(idUserGroup: number) {
    try {
      let products = await api.get<IMyProductModel[]>(`/my-products/${idUserGroup}`);

      products.data = products.data.filter(x => x.status != 'Consumido')

      setProducts(products.data);
      setSearchedProducts(products.data)

    } catch {
      setProducts([])
      setSearchedProducts([])

      Alert.alert('Erro', 'Não foi possível buscar seus produtos');
    }
  }
  async function openModal(id: number, status: string) {
    let product = searchedProducts.find(x => x.id == id);
    setSelectedProduct(product);
    setSelectedStatus(status);
    setModalVisible(true);
  }
  async function closeModal() {
    setModalVisible(false);
  }

  async function handleChangeProductStatus() {
    try {
      let req = {
        idMyProduct: selectedProduct?.id,
        amount: amountToUpdate,
        status: selectedStatus
      }
      await api.put(`/my-products/update-status`, req)

      Alert.alert('Sucesso!', 'Status do produto atualizado')
      await loadProducts(defaultUserGroupId);
      closeModal();

    } catch (error: any) {
      Alert.alert('Erro', error.response.data.error[0])
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!defaultUserGroupId) {
    return (
      <SafeZoneScreen>
        <Title content='Você precisa registrar uma despensa para visualizar seus produtos!' />

        <GreenButton onPress={() => navigator.navigate('UserGroup' as never)}>
          <Text style={{ color: 'white' }}>Nova despensa</Text>
        </GreenButton>
      </SafeZoneScreen>
    );
  }

  return (
    <SafeZoneScreen isWithoutHeader={false} isWithoutScroll={true}>
      <Title content='Sua Despensa' />

      <View style={styles.searchContainer}>
        <TextInput onChangeText={handleSearchProduct} placeholder='Buscar Produto' style={styles.searchInput} />

        <CustomButton style={styles.menuItemButton}>
          <Image source={require('../../../assets/searchIcon.png')} />
        </CustomButton>
      </View>

      <Text style={styles.selfCenter}>Ordenar por</Text>

      <View style={styles.sortButtonsContainer}>
        <CustomButton
          style={[
            styles.sortButton,
            selectedFilter === 0 && styles.sortButtonSelected
          ]}
          onPress={handleSortByAmount}
        >
          <Text style={(selectedFilter === 0 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Quantidade</Text>
        </CustomButton>
        <CustomButton
          style={[
            styles.sortButton,
            selectedFilter === 1 && styles.sortButtonSelected
          ]}
          onPress={handleSortByValidate}
        >
          <Text style={(selectedFilter === 1 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Validade</Text>
        </CustomButton>
        <CustomButton
          style={[
            styles.sortButton,
            selectedFilter === 2 && styles.sortButtonSelected
          ]}
          onPress={handleFilterExpireds}
        >
          <Text style={(selectedFilter === 2 ? styles.sortButtonTextSelected : styles.sortButtonText)}>Vencidos</Text>
        </CustomButton>
      </View>

      <View style={styles.productsContainer}>
        {
          searchedProducts.length === 0
            ? <Title content='Você não possui nenhum produto nessa despensa' />
            : (
              <FlatList
                data={searchedProducts}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <View style={styles.productContainer}>
                    <View style={styles.productImgContainer}>
                      <Image style={styles.image} source={require('../../../assets/logo.png')} />

                      <View style={styles.productNameContainer}>
                        <Text style={styles.productName}>{item.productEntity.name}</Text>
                        <Text style={styles.productName}>Vence em: {DateHelper.convertFromStoreToViewFormat(item.validate).substring(0, 10)}</Text>
                        <Text style={styles.productName}>Status: {item.status}</Text>
                      </View>
                    </View>

                    <Text>{item.amount} x</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <GreenButton onPress={() => openModal(item.id, 'open')} style={{ width: '30%' }}>
                        <Text>Abrir</Text>
                      </GreenButton>
                      <OrangeButton onPress={() => openModal(item.id, 'consumed')}>
                        <Text>Consumir</Text>
                      </OrangeButton>
                    </View>
                  </View>
                )}
              />
            )
        }
      </View>

      <View style={styles.pickerBorder}>
        <Picker
          style={styles.picker}
          mode='dropdown'
          selectedValue={defaultUserGroupId}
          onValueChange={handleChangeUserGroup}
        >
          {
            userGroups.map(x => (
              <Picker.Item key={x.id} label={x.name} value={x.id} />
            ))
          }
        </Picker>


        <CustomModal handleVisible={closeModal} isVisible={modalVisible}>
          <SafeAreaView>
            <View style={styles.amountContainer}>
              <Text style={styles.productModalName}>{selectedProduct?.productEntity.name}</Text>
              <Image
                style={styles.modalImage}
                source={require('../../../assets/logo.png')}
              />

              <NumericUpDown
                style={styles.upDown}
                value={amountToUpdate}
                onDown={() => setAmount(--amountToUpdate)}
                onUp={() => setAmount(++amountToUpdate)}
              />
            </View>
            <GreenButton onPress={handleChangeProductStatus}>
              {
                selectedStatus == 'open' ? <Text>Abrir produto</Text>
                  :
                  <Text>Consumir produto</Text>
              }
            </GreenButton>
          </SafeAreaView>
        </CustomModal>
      </View>
    </SafeZoneScreen>
  );
}
