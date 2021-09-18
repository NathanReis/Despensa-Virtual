import {
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        margin: 30
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 30
    },
    button: {
        backgroundColor: '#FDF5E6',
        width: 200,
        borderRadius: 5
    }
});