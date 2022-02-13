import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF7F7'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF7F7'
  },
  image: {
    height: Dimensions.get('window').width * 0.85,
    maxHeight: 325,
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 325,

    margin: 30
  },
  welcome: {
    padding: 30,

    fontSize: 22,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    width: '90%',
    maxWidth: 325,

    marginTop: 60,

    backgroundColor: '#F08F5F'
  },
  buttonContent: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
