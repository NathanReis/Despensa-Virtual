import { Dimensions, StyleSheet } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#f5fcff",
    // padding: 20
  },
  productNameContainer: {
    width: '100%'
  },
  productName: {
    width: '100%',
    flexWrap: 'wrap',
    fontSize: 15
  },
  productContainer: {
    backgroundColor: '#F8F8FB',
    // height: '20%',
    width: '80%',
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F08F5F'
  },
  searchContainer: {
    flexDirection: 'row',
    height: '60%',
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8FB',
    borderWidth: 1,
    borderColor: '#F08F5F',
    borderRadius: 10
  },
  menuItemButton: {
    backgroundColor: '#F8F8FB',
    height: '80%',
    // width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    width: '70%',
    // marginBottom: 10,
    height: '80%'
  },
  userGroupContainer: {
    height: '30%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  pickerBorder: {
    borderWidth: 1,
    borderRadius: 10
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 20
  }
})
