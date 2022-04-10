import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  amountContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#F8F8F8'
  },
  productName: {
    fontSize: 24,
    textAlign: 'center'
  },
  image: {
    height: 150,
    width: 150,

    marginVertical: 16
  },
  upDown: {
    justifyContent: 'center',

    width: 184,

    marginBottom: 16
  },
  validate: {
    marginTop: 32,
  },
  icon: {
    padding: 4,

    borderRadius: 8,

    backgroundColor: '#D0EDFB'
  },
  button: {
    marginTop: 45
  },
  buttonContent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
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
  iconRight: {
    position: 'absolute',
    bottom: 16
  },
  rightIcon: {
    right: 16
  },
  menuItemButton: {
    backgroundColor: '#F8F8FB',
    height: '20%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    width: '40%',
    height: '35%',
    borderRadius: 10,
    marginBottom: 20
  }
});
