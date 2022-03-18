import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { IUserGroupModel, IUserModel, User } from '../../storage/User';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { Loading } from '../../components/loading';
import { IMyProductModel } from '../product/IMyProductModel';

export function Pantry() {

    let [products, setProducts] = useState<IMyProductModel[]>([]);
    let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
    let [defaultUserGroup, setDefaultUserGroup] = useState<IUserGroupModel>({} as IUserGroupModel);
    let [isLoading, setIsLoading] = useState<boolean>(true);
    let navigator = useNavigation();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            async function load() {
                setIsLoading(true);
                let user = await User.getLoggedUser();
                setLoggedUser(user);

                let products = await api.get<IMyProductModel[]>(`/my-products/${user.idDefaultUserGroup}`);
                setProducts(products.data);
                console.log(products.data)

                let defaultGroup = user.userGroupEntities.find(x => x.id == user.idDefaultUserGroup);
                setDefaultUserGroup(defaultGroup!);
                setIsLoading(false);
            }

            load().catch(error => {
                Alert.alert('Erro', JSON.stringify(error));
            });
        }

    }, [isFocused]);

    if (isLoading) {
        return <Loading />;
    }


    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Sua Despensa</Text>

            <ScrollView >
                {products.map(x =>
                (
                    <View key={x.id} style={styles.productContainer}>
                        <View style={styles.productImgContainer}>
                            <Image style={styles.image} source={require('../../../assets/logo.png')} />
                            <View style={styles.productNameContainer}>
                                <Text style={styles.productName}>{x.productEntity.name}</Text>
                                <Text style={styles.productName}>Vence em: {x.validate}</Text>
                            </View>
                        </View>


                        <Text>{x.amount} x</Text>
                        {/* <Text>Vence em: {x.validate}</Text> */}
                    </View>

                ))}
            </ScrollView>
            <View style={styles.userGroupContainer}>
                <Picker
                    selectedValue={defaultUserGroup}
                    onValueChange={(value, index) => setDefaultUserGroup(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}
                >
                    <Picker.Item label={defaultUserGroup.name} value={defaultUserGroup.id} />
                </Picker>
                {products.length > 0 &&
                    <CustomButton style={styles.btnAdicionar}>
                        <Text style={styles.btnAdicionarTxt}>Adicionar</Text>
                    </CustomButton>}
            </View>
        </View>
    )
}
