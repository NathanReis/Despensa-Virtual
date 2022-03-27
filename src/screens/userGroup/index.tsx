import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { OrangeButton } from '../../components/orangeButton';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import { Title } from '../../components/title';
import api from '../../services/api';
import { User } from '../../storage/User';
import styles from './styles';

interface IUserGroupResponse {
  id: number;
}

export function UserGroup() {
  let [id, setId] = useState<number>(0);
  let [name, setName] = useState<string>('');
  let [isCreate, setIsCreate] = useState<boolean>(true);

  function validateUserGroup(): string[] {
    let errors: string[] = [];

    if (name.length == 0) {
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
      let response: AxiosResponse<IUserGroupResponse> = isCreate
        ? await api.post('/user-groups', { name })
        : await api.put(`/user-groups/${id}`, { name });
      let savedId = response.data.id;

      await saveUserInUserGroup(savedId)

      Alert.alert('Sucesso', 'Despensa salva com sucesso');

      setId(savedId);
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

  async function saveUserInUserGroup(savedId: number): Promise<void> {
    let loggedUser = await User.getLoggedUser();

    if (isCreate) {
      await api.post('/user-groups/users', { idUserGroup: savedId, idUser: loggedUser.id });

      loggedUser.userGroupEntities.push({ id: savedId, name });
    }

    await api.put(`/users/${loggedUser.id}`, { idDefaultUserGroup: savedId })

    loggedUser.idDefaultUserGroup = savedId;

    await User.setLoggedUser(loggedUser);
  }

  return (
    <SafeZoneScreen>
      <View style={styles.container}>
        <Title content={isCreate ? 'Criar nova despensa' : 'Editar despensa'} />

        <View style={styles.formContainer}>
          <CustomTextInput
            label='Nome da despensa'
            value={name}
            onChangeText={text => setName(text)}
          />

          <OrangeButton onPress={handleSave}>
            <Text>{isCreate ? 'Cadastrar' : 'Atualizar'}</Text>
          </OrangeButton>
        </View>
      </View>
    </SafeZoneScreen>
  )
}
