import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10
  },
  formContainer: {
    alignItems: 'center',
    height: '30%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  checkboxLabel: {
    fontSize: 16
  },
  listContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
    marginVertical: 5,

    backgroundColor: '#F8F8F8',
    width: '80%',
  },
  listItemTitle: {
    fontSize: 16
  },
  listItemActions: {
    flexDirection: 'row'
  },
  deleteButton: {
    backgroundColor: '#FBD3D0'
  },
  modal: {
    height: '40%',
    backgroundColor: 'red',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 30
  }
})
