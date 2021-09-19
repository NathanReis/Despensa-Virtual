import {
  Platform,
  StatusBar,
  StyleSheet
} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    marginHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
