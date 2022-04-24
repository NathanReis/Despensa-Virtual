import { StyleSheet } from 'react-native';

interface IStyleProps {
  subtitleColor?: string;
}

export default (
  { subtitleColor }: IStyleProps
) => StyleSheet.create({
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%'
  },
  radio: {
    alignItems: 'center',
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 32
  },
  subtitlesContainer: {},
  subtitleItem: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 8
  },
  subtitleColor: {
    height: 24,
    width: 24,

    marginRight: 8,

    backgroundColor: subtitleColor
  },
  pickerBorder: {
    borderWidth: 1,
    borderRadius: 8
  },
  picker: {
    padding: 32
  },
  sliderContainer: {
    marginVertical: 16
  },
  sliderLabel: {
    alignSelf: 'center',

    fontSize: 16
  }
});
