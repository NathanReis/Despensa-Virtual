import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF7F7'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7F7'
  },
  image: {
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 325,
    height: Dimensions.get('window').width * 0.85,
    maxHeight: 325,
    margin: 30
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 30
  },
  description: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#F08F5F',
    width: '90%',
    maxWidth: 325,
    marginTop: 60
  }
});
