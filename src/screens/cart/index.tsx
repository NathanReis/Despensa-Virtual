import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { CustomButton } from '../../components/button';
import { IUserGroupModel, IUserModel, User } from '../../storage/User';
import { FontAwesome } from "@expo/vector-icons";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Purchase } from '../../storage/Purchase';
import { IProductModel } from '../product/IProductModel';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { Loading } from '../../components/loading';

export function Cart() {

    let [products, setProducts] = useState<IProductModel[]>([]);
    let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
    let [defaultUserGroup, setDefaultUserGroup] = useState<IUserGroupModel>({} as IUserGroupModel);
    let [isLoading, setIsLoading] = useState<boolean>(true);
    let [defaultUserGroupId, setDefaultUserGroupId] = useState<number>(0);
    let navigator = useNavigation();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            async function load() {
                setIsLoading(true);

                let products = await Purchase.getProducts();
                setProducts(products);

                let user = await User.getLoggedUser();
                setLoggedUser(user);
                let defaultGroup;

                if (user.idDefaultUserGroup != null) {
                    defaultGroup = user.userGroupEntities.find(x => x.id == user.idDefaultUserGroup);
                    setDefaultUserGroup(defaultGroup!);
                    setDefaultUserGroupId(defaultGroup!.id);
                }

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
    if (defaultUserGroupId == 0) {
        return (
            <View >
                <Text style={styles.pageTitle}>Você precisa registrar uma residência para poder salvar seus produtos</Text>
            </View>
        )
    }
    async function saveProducts() {
        let productsDTO: any = [];

        products.map(x => {
            let product = {
                idProduct: x.id,
                idUserGroup: defaultUserGroup.id,
                amount: x.amount,
                validate: x.validate,
                measure: {
                    unit: "kg",
                    value: 2
                },
                position: x.id
            }

            productsDTO.push(product);
        });
        let date = new Date();
        let formatedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        let purchase = {
            idUserGroup: defaultUserGroupId,
            products: productsDTO,
            purchaseDate: formatedDate
        }
        try {
            await api.post('/purchases', purchase);
            Alert.alert('Produtos salvos com sucesso!')
            Purchase.cleanProducts();
            setProducts([]);
        }
        catch (error: any) {
            console.log(error.response)
            Alert.alert(error.response.data.error[0])
        }
    }

    function convertStringToDate(dateStr: string): Date {
        let dates = dateStr.split('/');
        let date = new Date()
        date.setDate(Number(dates[0]));
        date.setMonth(Number(dates[1]) - 1);
        date.setFullYear(Number(dates[2]));

        return date;
    }

    async function removeProductFromCart(barcode: string) {
        let newProducts = await Purchase.removeProductByBarcode(barcode);
        setProducts(newProducts);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Salvar Produtos</Text>

            <ScrollView >
                {products.map(x =>
                (
                    <View key={x.id} style={styles.productContainer}>
                        <View style={styles.productImgContainer}>
                            <Image style={styles.image} source={require('../../../assets/logo.png')} />
                            <View style={styles.productNameContainer}>
                                <Text style={styles.productName}>{x.name}</Text>
                            </View>
                            <CustomButton
                                onPress={() => removeProductFromCart(x.barcode)}
                            >
                                <FontAwesome size={30} style={styles.trashIcon} name='trash' />
                            </CustomButton>
                        </View>


                        <Text>{x.amount} x</Text>
                        {/* <Text>Vence em: {x.validate}</Text> */}
                    </View>

                ))}
            </ScrollView>
            <View style={styles.userGroupContainer}>
                <View style={styles.pickerBorder}>
                    <Picker
                        selectedValue={defaultUserGroupId}
                        onValueChange={(value, index) => setDefaultUserGroupId(value)}
                        mode="dropdown" // Android only
                        style={styles.picker}
                    >
                        {/* <Picker.Item label={defaultUserGroup.name} value={defaultUserGroup.id} /> */}
                        {loggedUser.userGroupEntities.map(x => (
                            <Picker.Item key={x.id} label={x.name} value={x.id} />
                        ))}
                    </Picker>
                </View>

                {products.length > 0 &&
                    <CustomButton onPress={saveProducts} style={styles.btnAdicionar}>
                        <Text style={styles.btnAdicionarTxt}>Adicionar</Text>
                    </CustomButton>}
            </View>
        </View>
    )
}
