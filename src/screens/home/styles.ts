import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    welcomeTitle: {
        fontSize: 20
    },
    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
    },
    menuItemsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
        flexWrap: 'wrap',
        marginTop: 10
    },
    iconContainer: {
        width: '40%',
        height: '35%',
        borderRadius: 10,
        marginBottom: 20
    },
    menuItemButton: {
        backgroundColor: '#F8F8FB',
        height: '20%',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuLargeItemButton: {
        backgroundColor: '#F8F8FB',
        height: '70%',
        width: 240,
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'row',
        marginTop: 45
    },
    menuLargeItemText: {
        fontSize: 15
    },
    largeMenuIconContainer: {
        width: '20%',
        height: '40%',
        marginRight: 10,
        marginBottom: 10
    }
})
