import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    width: '100%'
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10
  },
  icon: {
    marginLeft: 5
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10
  }
});
