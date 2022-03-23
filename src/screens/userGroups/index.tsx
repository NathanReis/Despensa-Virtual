import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { User } from '../../storage/User';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { CustomTextInput } from '../../components/textInput';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

export function UserGroup() {

    let [userGroupName, setUserGroupName] = useState<string>('');
    let navigator = useNavigation();

    useEffect(() => {

    }, [])

    interface IUserGroupResponse {
        id: number
    }

    async function handleSaveUserGroup() {
        if (userGroupName.trim().length == 0) {
            Alert.alert('Erro', 'Informe como gostaria de chamar sua despensa');
            return;
        }

        try {
            let response: AxiosResponse<IUserGroupResponse> = await api.post('/user-groups', { name: userGroupName });
            let userGroupCreatedId = response.data.id;
            await saveUserInUserGroup(userGroupCreatedId)
            Alert.alert('Sucesso', 'Despensa registrada com sucesso');
            setUserGroupName('')

        } catch (error: Error | any) {
            Alert.alert('Erro', error.message);
        }

    }

    async function saveUserInUserGroup(idUserGroup: number) {
        let loggedUser = await User.getLoggedUser();
        await api.post('/user-groups/users', { idUser: loggedUser.id, idUserGroup });
        loggedUser.idDefaultUserGroup = idUserGroup;
        loggedUser.userGroupEntities.push({ id: idUserGroup, name: userGroupName });

        await api.put(`/users/${loggedUser.id}`, { idDefaultUserGroup: idUserGroup })

        await User.setLoggedUser(loggedUser);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar nova despensa</Text>

            <View>
                <Text style={styles.subtitle}>Nome da despensa</Text>
                <CustomTextInput value={userGroupName} onChangeText={(name) => setUserGroupName(name)} style={styles.groupNameInput}></CustomTextInput>
            </View>
            <CustomButton onPress={handleSaveUserGroup} style={styles.button}>
                <Text style={styles.textButton}>Cadastrar</Text>
            </CustomButton>
        </View>
    )
}