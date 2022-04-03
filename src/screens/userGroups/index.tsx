import { FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/button';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import { User } from '../../storage/User';
import { IUserGroupModel, UserGroupStorage } from '../../storage/UserGroup';
import styles from './styles';

export function UserGroups() {
  let [idDefaultUserGroup, setIdDefaultUserGroup] = useState<number | null>(null);
  let [userGroups, setUserGroups] = useState<IUserGroupModel[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let isFocused = useIsFocused();
  let navigator = useNavigation();

  async function loadData() {
    setIsLoading(true);

    try {
      setIdDefaultUserGroup((await User.getLoggedUser()).idDefaultUserGroup);
      setUserGroups(await UserGroupStorage.getAll());
    } catch {
      Alert.alert('Erro', 'Erro inesperado!');
    }

    setIsLoading(false);
  }

  function handleEdit(id: number) {
    navigator.navigate('UserGroup' as never, { id } as never);
  }

  async function handleRemove(id: number) {
    await UserGroupStorage.remove(id);
    await loadData();
  }

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <Title content='Despensas' />

      <CustomButton onPress={() => navigator.navigate('UserGroup' as never)}>
        <Text>Criar nova despensa</Text>
      </CustomButton>

      {
        isLoading
          ? <Loading />
          : (
            <FlatList
              data={userGroups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                  <Text
                    style={[
                      styles.listItemTitle,
                      idDefaultUserGroup === item.id && { fontWeight: 'bold' }
                    ]}
                  >
                    {idDefaultUserGroup === item.id && '* '}
                    {item.name}
                  </Text>

                  <View style={styles.listItemActions}>
                    <CustomButton
                      style={styles.editButton}
                      onPress={() => handleEdit(item.id)}
                    >
                      <FontAwesome5 name='pencil-alt' size={16} color='black' />
                    </CustomButton>

                    <CustomButton
                      style={styles.deleteButton}
                      onPress={() => handleRemove(item.id)}
                    >
                      <FontAwesome5 name='trash' size={16} color='black' />
                    </CustomButton>
                  </View>
                </View>
              )}
            />
          )
      }
    </SafeZoneScreen>
  )
}
