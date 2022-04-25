import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 64,

    marginBottom: 16,
    padding: 8,

    backgroundColor: '#F8F8FB',
    borderRadius: 8
  },
  searchInput: {
    flex: 1,

    height: '100%'
  },
  menuItemButton: {
    marginRight: 0
  },
  selfCenter: {
    alignSelf: 'center'
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  sortButton: {
    borderColor: '#F08F5F',
    borderWidth: 1
  },
  sortButtonSelected: {
    backgroundColor: '#F08F5F'
  },
  sortButtonText: {
    color: '#F08F5F'
  },
  sortButtonTextSelected: {
    color: '#F8F8FB'
  },
  productsContainer: {
    flex: 1
  },
  productContainer: {
    alignItems: 'center',

    marginVertical: 8,
    padding: 8,

    backgroundColor: '#F8F8FB',
    borderColor: '#F08F5F',
    borderRadius: 16,
    borderWidth: 1
  },
  productImgContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    height: 40,
    width: 40,

    marginRight: 8
  },
  productNameContainer: {
    width: '80%'
  },
  productName: {
    flexWrap: 'wrap',

    fontSize: 15
  },
  pickerBorder: {
    marginVertical: 16,

    borderWidth: 1,
    borderRadius: 8
  },
  picker: {
    padding: 32
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    height: '65%',
    marginBottom: 20
  },
  productModalName: {
    fontSize: 20,
    textAlign: 'center'
  },
  modalImage: {
    height: 100,
    width: 100,

    marginVertical: 16
  },
  upDown: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 0,
    marginBottom: 16
  }
})
