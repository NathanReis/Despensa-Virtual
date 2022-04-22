import { Dimensions, StyleSheet } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  cardContainer: {
    width: deviceWidth * 0.8,
    backgroundColor: 'white',
    borderWidth: 0.5,
    marginTop: 40,
  }
})
