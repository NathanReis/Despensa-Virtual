import { Dimensions, StyleSheet } from 'react-native';

let imageSize = Dimensions.get('window').width * 0.85;
let maxImageSize = 325;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: imageSize,
    maxHeight: maxImageSize,
    width: imageSize,
    maxWidth: maxImageSize,

    marginVertical: 30
  },
  welcome: {
    padding: 30,

    fontSize: 24,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  checkboxLabel: {
    fontSize: 16
  },
  privacyTextLabel: {
    color: '#5A8AF9',
    textDecorationLine: 'underline',
  }
});
