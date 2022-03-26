import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        flex: 1
    },
    productContainer: {
        backgroundColor: '#F8F8FB',
        // height: '20%',
        width: '100%',
        marginBottom: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 10,
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    productImgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',

    },
    pageTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    trashIcon: {
        margin: 3
    },
    productNameContainer: {
        width: '50%'
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
        justifyContent: 'center',
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
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
    }
})
