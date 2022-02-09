import {
  Platform,
  StatusBar,
  StyleSheet
} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
