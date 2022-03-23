import { StyleSheet } from 'react-native';
import { lightBlue100 } from 'react-native-paper/lib/typescript/styles/colors';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 40,
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    productContainer: {
        backgroundColor: '#F8F8FB',
        // height: '20%',
        width: '100%',
        marginBottom: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        padding: 10,
        borderWidth: 1,
        borderColor: '#F08F5F'
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    productImgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    pageTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 20
    },
    trashIcon: {
        margin: 3
    },
    productNameContainer: {
        width: '80%'
    },
    productName: {
        width: '100%',
        flexWrap: 'wrap',
        fontSize: 15
    },
    userGroupContainer: {
        height: '30%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },
    pickerBorder: {
        borderWidth: 1,
        borderRadius: 10
    },
    btnAdicionar: {
        width: '100%',
        height: '30%',
        backgroundColor: '#F08F5F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAdicionarTxt: {
        color: 'white',
        fontSize: 18
    },
    searchInput: {
        width: '70%',
        // marginBottom: 10,
        height: '80%'
    },
    menuItemButton: {
        backgroundColor: '#F8F8FB',
        height: '80%',
        // width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        // width: '40%',
        // height: '35%',
        // borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        height: '10%',
        width: '90%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F8FB'
    }
})