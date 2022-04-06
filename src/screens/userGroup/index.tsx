import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/button';
import { Loading } from '../../components/loading';
import { OrangeButton } from '../../components/orangeButton';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import { Title } from '../../components/title';
import api from '../../services/api';
import { IUserModel, User } from '../../storage/User';
import { IUserGroupModel, UserGroupStorage } from '../../storage/UserGroup';
import styles from './styles';
import { CustomModal } from '../../components/modal';

interface IParams {
  id?: number;
}

export function UserGroup() {
  let [id, setId] = useState<number>(0);
  let [name, setName] = useState<string>('');
  let [userToAddEmail, setUserToAddEmail] = useState<string>('');
  let [isDefault, setIsDefault] = useState<boolean>(false);
  let [modalVisible, setModalVisible] = useState<boolean>(false);
  let [isCreate, setIsCreate] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [users, setUsers] = useState<Array<IUserModel>>([]);
  let [loggedUser, setLoggedUser] = useState<IUserModel>();
  let isFocused = useIsFocused();
  let navigator = useNavigation();
  let route = useRoute();

  useEffect(() => {
    async function loadData() {
      try {
        let params = route.params as IParams;

        if (params && params.id) {
          let loggedUser = await User.getLoggedUser();
          // let userGroup = loggedUser.userGroupEntities.find(_userGroup => _userGroup.id === params.id);
          let userGroup = (await api.get<IUserGroupModel>(`user-groups/${params.id}`)).data;

          setId(userGroup!.id);
          setName(userGroup!.name);
          setIsDefault(userGroup!.id === loggedUser.idDefaultUserGroup);
          setIsCreate(false);
          setLoggedUser(loggedUser)
          await getUsersOfGroup(userGroup!.id);
        } else {
          clearFields();
          setIsCreate(true);
        }
      } catch (error) {
        console.log(error)
        Alert.alert('Erro', 'Erro inesperado!');
      }

      setIsLoading(false);
    }

    if (isFocused) {
      setIsLoading(true);
      loadData();
      navigator.setParams({ id: 0 } as never);
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  function clearFields() {
    setName('');
    setIsDefault(false);
  }

  function validateUserGroup(): string[] {
    let errors: string[] = [];

    if (name.length == 0) {
      errors.push('Informe como gostaria de chamar sua despensa');
    }

    return errors;
  }

  function validateUserEmail(): string[] {
    let errors: string[] = [];

    if (!userToAddEmail || userToAddEmail.trim().length == 0) {
      errors.push('Informe como gostaria de chamar sua despensa');
    }
    return errors;
  }

  async function handleSave(): Promise<void> {
    setName(name.trim());

    let errors = validateUserGroup();

    if (errors.length !== 0) {
      Alert.alert('Registro inválido', `- ${errors.join('\n- ')}`);
      return;
    }

    try {
      let userGroup: IUserGroupModel = { id, name };

      if (isCreate) {
        let createdId = await UserGroupStorage.add(userGroup, isDefault);

        setId(createdId);
      } else {
        await UserGroupStorage.update(userGroup, isDefault);
      }

      Alert.alert('Sucesso', 'Despensa salva com sucesso');

      setIsCreate(false);
    } catch (error: any) {
      if (Object.keys(error).some(key => key === 'response')) {
        errors = error.response.data.error;
        Alert.alert('Registro inválido', `- ${errors.join('\n- ')}`);
      } else {
        Alert.alert('Erro', 'Erro inesperado');
      }
    }
  }

  async function getUsersOfGroup(groupId: number) {
    let response = await api.get<Array<IUserModel>>(`user-groups/${groupId}/users`)
    let users = await response.data;

    setUsers(users);
  }

  async function handleAddUserToGroup() {
    let errors = validateUserGroup();

    if (errors.length !== 0) {
      Alert.alert('Registro inválido', `- ${errors.join('\n- ')}`);
      return;
    }

    try {
      let userFound = (await api.get<IUserModel>(`users/email/${userToAddEmail.trim()}`)).data;
      await api.post(`user-groups/users`, { idUserGroup: id, idUser: userFound.id });

      let newUsers = users;
      newUsers.push(userFound);
      setUsers([...newUsers])

      Alert.alert('Sucesso', 'Usuário adicionado com sucesso');
    } catch (error: any) {
      if (Object.keys(error).some(key => key === 'response')) {
        errors = error.response.data.error;
        Alert.alert('Registro inválido', `- ${errors.join('\n- ')}`);
      } else {
        Alert.alert('Erro', 'Erro inesperado');
      }
    }
  }

  async function handleRemoveUser(userId: number, userName: string) {
    Alert.alert(
      "Remover usuário da despensa",
      `Você realmente deseja remover ${userName} dessa despensa?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await confirmRemoveUser(userId)
          },
        },
        {
          text: "Não",
        },
      ]
    );

  }

  async function confirmRemoveUser(userId: number) {
    try {
      await api.delete(`user-groups/${id}/users/${userId}`)

      let newUsers = users.filter(x => x.id != userId);
      setUsers([...newUsers])

      Alert.alert('Removido', 'Usuário removido com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', 'Erro inesperado');
    }
  }

  async function openModal() {
    setModalVisible(true);
  }
  async function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Title content={isCreate ? 'Criar nova despensa' : 'Editar despensa'} />

        <View style={styles.formContainer}>

          <CustomTextInput
            label='Nome da despensa'
            value={name}
            onChangeText={setName}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox value={isDefault} onValueChange={setIsDefault} />
            <Text
              style={styles.checkboxLabel}
              onPress={() => setIsDefault(!isDefault)}
            >
              Tornar padrão
            </Text>
          </View>

          <OrangeButton onPress={handleSave}>
            <Text>{isCreate ? 'Cadastrar' : 'Atualizar'}</Text>
          </OrangeButton>
        </View>

        {
          !isCreate &&

          <View style={{ height: '40%' }}>
            <View style={styles.listContainer}>
              <Text style={styles.listItemTitle}>Usuários dessa despensa</Text>
              <FlatList
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <View style={styles.listItemContainer}>
                    <Text
                      style={[
                        styles.listItemTitle,
                        loggedUser?.id === item.id && { fontWeight: 'bold' }
                      ]}
                    >
                      {item.name} {loggedUser?.id === item.id && <Text>(Você)</Text>}
                    </Text>

                    <View style={styles.listItemActions}>
                      {loggedUser?.id !== item.id &&

                        <CustomButton
                          style={styles.deleteButton}
                          onPress={() => handleRemoveUser(item.id, item.name)}
                        >
                          <FontAwesome5 name='trash' size={16} color='black' />
                        </CustomButton>}
                    </View>
                  </View>
                )}
              />
            </View>
            <OrangeButton onPress={openModal}>
              <Text>Adicionar Usuário</Text>
            </OrangeButton>
          </View>
        }


        <CustomModal handleVisible={closeModal} isVisible={modalVisible}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.formContainer}>
              <Text
                style={styles.modalTitle}
              >
                Adicionar usuário à despensa
              </Text>
              <CustomTextInput
                label='Email do usuário'
                value={userToAddEmail}
                keyboardType='email-address'
                onChangeText={setUserToAddEmail}
              />
              <OrangeButton onPress={handleAddUserToGroup}>
                <Text>{'Cadastrar'}</Text>
              </OrangeButton>
            </View>
          </KeyboardAvoidingView>
        </CustomModal>
      </KeyboardAvoidingView>
    </View>
  )
}
