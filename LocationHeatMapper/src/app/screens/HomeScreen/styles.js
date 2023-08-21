import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // height: height,
    // width: width,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    height: 50,
    width: 120,
    backgroundColor: '#FF6969',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
