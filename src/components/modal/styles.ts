import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    height: 100,

    marginHorizontal: 16,
    marginVertical: 64,
    padding: 16,

    borderRadius: 32,

    elevation: 10,

    backgroundColor: '#FFFFFF'
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginEnd: 0,
    marginTop: 0
  }
});
