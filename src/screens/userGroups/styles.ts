import { StyleSheet } from 'react-native';
import { lightBlue100 } from 'react-native-paper/lib/typescript/styles/colors';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
        flex: 1,
    },
    groupNameInput: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#25D482'
    },
    title: {
        fontSize: 20,
        marginBottom: 40
    },
    subtitle: {
        fontSize: 15,
    },
    button: {
        backgroundColor: '#25D482',
        width: '80%',
        marginTop: 50,
        height: '10%',
        justifyContent: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 18
    }

})