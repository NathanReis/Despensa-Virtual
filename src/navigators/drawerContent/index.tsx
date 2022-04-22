import React, { useEffect, useState } from "react";
import { View, StyleSheet, DevSettings } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IUserModel, User } from "../../storage/User";
import { Loading } from "../../components/loading";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { Restart } from "fiction-expo-restart";
export function DrawerContent(props: DrawerContentComponentProps) {
  let [loggedUser, setLoggedUser] = useState<IUserModel>();
  let [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    async function loadData() {
      setIsLoading(true);
      let user = await User.getLoggedUser();
      setLoggedUser(user);
      setIsLoading(false);
    }

    loadData();
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: loggedUser?.picture
              }}
              size={50}
            />
            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
              <Title style={styles.title}>{loggedUser?.name}</Title>
              <Caption style={styles.caption}>{loggedUser?.email}</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => { props.navigation.navigate('Home') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="barcode"
                color={color}
                size={size}
              />
            )}
            label="Novo produto"
            onPress={() => { props.navigation.navigate('BarcodeScan') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="cart"
                color={color}
                size={size}
              />
            )}
            label="Carrinho"
            onPress={() => { props.navigation.navigate('Cart') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="food"
                color={color}
                size={size}
              />
            )}
            label="Meus produtos"
            onPress={() => { props.navigation.navigate('Pantry') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-edit"
                color={color}
                size={size}
              />
            )}
            label="Gerenciar despensa"
            onPress={() => { props.navigation.navigate('UserGroup') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-details"
                color={color}
                size={size}
              />
            )}
            label="Minhas despensas"
            onPress={() => { props.navigation.navigate('UserGroups') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-details"
                color={color}
                size={size}
              />
            )}
            label="Gráficos"
            onPress={() => { props.navigation.navigate('ChartsMenu') }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Deslogar"
          onPress={async () => {
            await LocalStorageHelper.set('logged', 'n');
            Restart();
          }}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
