import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  label: {
    marginStart: 16,
    marginBottom: -8,

    zIndex: 100,

    fontSize: 16,
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',

    minWidth: 168
  },
  input: {
    width: '100%',
    minWidth: 144,

    paddingHorizontal: 32,
    paddingVertical: 16,

    borderRadius: 16,

    backgroundColor: '#F8F8F8',

    fontSize: 24,
    lineHeight: 24
  },
  icon: {
    position: 'absolute',
    bottom: 16
  },
  rightIcon: {
    right: 16
  }
});
