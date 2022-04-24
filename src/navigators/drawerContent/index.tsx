import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { Restart } from 'fiction-expo-restart';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Caption, Drawer, Title } from 'react-native-paper';
import { Loading } from '../../components/loading';
import { LocalStorageHelper } from '../../helpers/LocalStorageHelper';
import { IUserModel, User } from '../../storage/User';
import styles from './styles';

export function DrawerContent(props: DrawerContentComponentProps) {
  let [loggedUser, setLoggedUser] = useState<IUserModel>();
  let [isLoading, setIsLoading] = useState<boolean>(true);

  async function handleSignOut() {
    await LocalStorageHelper.set('logged', 'n');
    Restart();
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      let user = await User.getLoggedUser();
      setLoggedUser(user);

      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{ uri: loggedUser?.picture }}
            size={50}
          />

          <View style={{ marginLeft: 15 }}>
            <Title style={styles.title}>{loggedUser?.name}</Title>
            <Caption style={styles.caption}>{loggedUser?.email}</Caption>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name='exit-to-app'
              color={color}
              size={size}
            />
          )}
          label='Deslogar'
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  )
}
