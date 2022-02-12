import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 16,

    borderRadius: 5,

    backgroundColor: '#FFFFFF'
  },
  input: {
    width: '70%',

    marginHorizontal: 0,

    borderBottomWidth: 0,

    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  upDownButton: {
    width: '15%',
    minWidth: 32,

    marginHorizontal: 0
  }
});
