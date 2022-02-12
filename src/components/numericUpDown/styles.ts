import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 16,

    borderRadius: 5,

    backgroundColor: '#FFFFFF'
  },
  inputContainer: {
    borderRadius: 5,

    width: '70%',
    minWidth: 88
  },
  input: {
    width: '70%',
    minWidth: 88,

    marginHorizontal: 0,
    paddingHorizontal: 24,

    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  upDownButton: {
    width: '15%',
    minWidth: 32,

    marginHorizontal: 0
  }
});
