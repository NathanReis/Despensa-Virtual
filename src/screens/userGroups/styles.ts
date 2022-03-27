import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
    marginVertical: 5,

    backgroundColor: '#F8F8F8'
  },
  listItemTitle: {
    fontSize: 16
  },
  listItemActions: {
    flexDirection: 'row'
  },
  editButton: {
    backgroundColor: '#D0EDFB'
  },
  deleteButton: {
    backgroundColor: '#FBD3D0'
  }
})
