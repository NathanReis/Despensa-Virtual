import { Dimensions, StyleSheet } from 'react-native';

interface IStyleProps {
  backgroundColor?: string;
  isWithoutHeader?: boolean;
}

export default (
  { backgroundColor, isWithoutHeader }: IStyleProps
) => StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height - (isWithoutHeader ? 0 : 80),
    width: Dimensions.get('window').width,

    paddingHorizontal: 20,

    backgroundColor: backgroundColor ?? '#FFFFFF'
  },
  containerWithoutScroll: {
    height: Dimensions.get('window').height - (isWithoutHeader ? 0 : 80),
  }
});
