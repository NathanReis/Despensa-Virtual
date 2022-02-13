import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    height: '50%',

    backgroundColor: 'white'
  },
  container2: {
    flex: 1,
  },
  scanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerGrid: {
    flex: 1,
    justifyContent: 'space-between',

    width: '100%',

    backgroundColor: 'transparent'
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    paddingBottom: 30,
    paddingHorizontal: 32,

    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  flipText: {
    margin: 5,

    fontSize: 16,
    lineHeight: 16
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',

    paddingHorizontal: 32,
    paddingTop: 30,

    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  instructions: {
    maxWidth: 300,

    fontSize: 16,
    textAlign: 'center',

    lineHeight: 20
  }
});
