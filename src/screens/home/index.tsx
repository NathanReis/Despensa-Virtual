import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { User } from '../../storage/User';
import styles from './styles';

export function Home() {

  let [userName, setUserName] = useState<string>('');
  let navigator = useNavigation();

  useEffect(() => {
    async function loadLoggerUser() {
      let user = await User.getLoggedUser();
      setUserName(user.name);
    }
    loadLoggerUser().catch(error => {
      Alert.alert('Erro', 'Usuário não encontrado');
    });
  }, [])

  function handleNavigationToScan() {
    navigator.navigate('BarcodeScan' as never);
  };

  function handleNavigationToCart() {
    navigator.navigate('Cart' as never);
  };

  function handleNavigationToPantry() {
    navigator.navigate('Pantry' as never);
  };
  function handleNavigationToUserGroup() {
    navigator.navigate('UserGroup' as never);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Bem vindo {userName.split(' ')[0]}</Text>
      </View>
      {/* <Text style={styles.pageTitle}>Home</Text> */}

      <View style={styles.menuItemsContainer}>
        <CustomButton
          onPress={() => handleNavigationToScan()}
          style={styles.menuItemButton}>
          <Image
            style={styles.iconContainer}
            source={require('../../../assets/barcodeIcon.png')}
          />
          <Text>Novo Produto</Text>
        </CustomButton>

        <CustomButton
          onPress={() => handleNavigationToPantry()}
          style={styles.menuItemButton}>
          <Image
            style={styles.iconContainer}
            source={require('../../../assets/calendarIcon.png')}
          />
          <Text>Meus produtos</Text>
        </CustomButton>

        <CustomButton style={styles.menuItemButton}>
          <Image
            style={styles.iconContainer}
            source={require('../../../assets/cartIcon.png')}
          />
          <Text>Lista de compras</Text>
        </CustomButton>

        <CustomButton style={styles.menuItemButton}>
          <Image
            style={styles.iconContainer}
            source={require('../../../assets/warningIcon.png')}
          />
          <Text>Produtos vencidos</Text>
        </CustomButton>

        <View style={styles.itemsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ paddingHorizontal: 20 }}>
            <CustomButton onPress={() => handleNavigationToUserGroup()}
              style={styles.menuLargeItemButton}>
              <Image
                style={styles.largeMenuIconContainer}
                source={require('../../../assets/editUserIcon.png')}
              />
              <Text style={styles.menuLargeItemText}>
                Gerenciar despensas
              </Text>
            </CustomButton>

            <CustomButton
              onPress={() => handleNavigationToCart()}
              style={styles.menuLargeItemButton}>
              <Image
                style={styles.largeMenuIconContainer}
                source={require('../../../assets/cartIcon.png')}
              />
              <Text style={styles.menuLargeItemText}>
                Carrinho
              </Text>
            </CustomButton>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
