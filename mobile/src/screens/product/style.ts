import {
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    marginHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
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
  }
});
