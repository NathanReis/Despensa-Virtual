import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { IUserGroupModel, IUserModel, User } from '../../storage/User';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { Loading } from '../../components/loading';
import { IMyProductModel } from '../product/IMyProductModel';
import { CustomTextInput } from '../../components/textInput';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Pantry() {

    let [products, setProducts] = useState<IMyProductModel[]>([]);
    let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
    let [defaultUserGroup, setDefaultUserGroup] = useState<IUserGroupModel>({} as IUserGroupModel);
    let [defaultUserGroupId, setDefaultUserGroupId] = useState<number>(0);
    let [searchedProducts, setSearchedProducts] = useState<IMyProductModel[]>([]);
    let [isLoading, setIsLoading] = useState<boolean>(true);
    let navigator = useNavigation();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            async function load() {
                setIsLoading(true);
                let user = await User.getLoggedUser();
                setLoggedUser(user);

                let products;
                let defaultGroup;

                if (user.idDefaultUserGroup != null) {
                    products = await api.get<IMyProductModel[]>(`/my-products/${user.idDefaultUserGroup}`);
                    defaultGroup = user.userGroupEntities.find(x => x.id == user.idDefaultUserGroup);
                    setProducts(products.data);
                    setSearchedProducts(products.data);
                    setDefaultUserGroup(defaultGroup!);
                    setDefaultUserGroupId(defaultGroup!.id);
                }
                setIsLoading(false);
            }

            load().catch(error => {
                console.log(error.response.data)
                Alert.alert('Erro', JSON.stringify(error.response.data));
            });
        }

    }, [isFocused]);

    async function handleChangeUserGroup(id: number) {
        let products = await api.get<IMyProductModel[]>(`/my-products/${id}`);
        setProducts(products.data);
        setSearchedProducts(products.data)
        setDefaultUserGroupId(id);
    }

    function handleSearchProduct(productName: string) {
        let possibleProducts = products.filter(x => x.productEntity.name.toLocaleLowerCase().indexOf(productName.toLocaleLowerCase()) > -1)

        if (possibleProducts.length > 0)
            setSearchedProducts(possibleProducts);
        else
            setSearchedProducts(products)
    }

    if (isLoading) {
        return <Loading />;
    }

    if (defaultUserGroupId == 0) {
        return (
            <View >
                <Text style={styles.pageTitle}>Você precisa registrar uma residência para visualizar seus produtos!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Sua Despensa</Text>
            <View style={styles.searchContainer}>
                <TextInput onChangeText={(productName) => handleSearchProduct(productName)} placeholder='Buscar Produto' style={styles.searchInput} />
                <CustomButton style={styles.menuItemButton}>
                    <Image
                        style={styles.iconContainer}
                        source={require('../../../assets/searchIcon.png')}
                    />
                </CustomButton>
            </View>

            <ScrollView >
                {searchedProducts.map(x =>
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
                    </View>
                ))}
            </ScrollView>
            <SafeAreaView style={styles.userGroupContainer}>
                <View style={styles.pickerBorder}>
                    <Picker
                        selectedValue={defaultUserGroupId}
                        onValueChange={(value, index) => handleChangeUserGroup(value)}
                        mode="dropdown" // Android only
                        style={styles.picker}
                    >
                        {loggedUser.userGroupEntities.map(x => (
                            <Picker.Item key={x.id} label={x.name} value={x.id} />
                        ))}
                    </Picker>

                </View>

                {products.length > 0 &&
                    <CustomButton style={styles.btnAdicionar}>
                        <Text style={styles.btnAdicionarTxt}>Adicionar</Text>
                    </CustomButton>}
            </SafeAreaView>
        </View>
    )
}
