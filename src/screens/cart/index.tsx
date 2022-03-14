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
export function Cart() {

    let [products, setProducts] = useState<IProductModel[]>([]);
    let [loggedUser, setLoggedUser] = useState<IUserModel>({} as IUserModel);
    let [defaultUserGroup, setDefaultUserGroup] = useState<IUserGroupModel>({} as IUserGroupModel);
    let navigator = useNavigation();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            async function load() {
                let products = await Purchase.getProducts();
                setProducts(products);

                let user = await User.getLoggedUser();
                // let user2 = await api.get('/')
                setLoggedUser(user);

                let defaultGroup = user.userGroupEntities.find(x => x.id == user.idDefaultUserGroup);
                setDefaultUserGroup(defaultGroup!);


                console.log(defaultGroup)

            }
            load().catch(error => {
                Alert.alert('Erro', JSON.stringify(error));
            });
        }

    }, [isFocused])


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
            {/* </ScrollView> */}
            <View style={styles.userGroupContainer}>

                <Picker
                    selectedValue={defaultUserGroup}
                    onValueChange={(value, index) => setDefaultUserGroup(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}
                >

                    {/* Essa linha aqui que crasha o app ao descomentar */}
                    {/* <Picker.Item label={defaultUserGroup.name} value={defaultUserGroup.id} /> */}

                </Picker>
                <CustomButton style={styles.btnAdicionar}>
                    <Text style={styles.btnAdicionarTxt}>Adicionar</Text>
                </CustomButton>

            </View>
        </View>
    )
}