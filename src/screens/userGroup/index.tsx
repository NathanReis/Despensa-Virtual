import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Loading } from '../../components/loading';
import { OrangeButton } from '../../components/orangeButton';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { CustomTextInput } from '../../components/textInput';
import { Title } from '../../components/title';
import { User } from '../../storage/User';
import { IUserGroupModel, UserGroupStorage } from '../../storage/UserGroup';
import styles from './styles';

interface IParams {
  id?: number;
}

export function UserGroup() {
  let [id, setId] = useState<number>(0);
  let [name, setName] = useState<string>('');
  let [isDefault, setIsDefault] = useState<boolean>(false);
  let [isCreate, setIsCreate] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let isFocused = useIsFocused();
  let navigator = useNavigation();
  let route = useRoute();

  useEffect(() => {
    async function loadData() {
      try {
        let params = route.params as IParams;

        if (params && params.id) {
          let loggedUser = await User.getLoggedUser();
          let userGroup = loggedUser.userGroupEntities.find(_userGroup => _userGroup.id === params.id);

          setId(userGroup!.id);
          setName(userGroup!.name);
          setIsDefault(userGroup!.id === loggedUser.idDefaultUserGroup);
          setIsCreate(false);
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

  return (
    <SafeZoneScreen>
      <View style={styles.container}>
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
      </View>
    </SafeZoneScreen>
  )
}
