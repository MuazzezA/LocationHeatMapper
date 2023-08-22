import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../../assets/theme/theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: sizes.base,
    height: 50,
    width: sizes.width * 0.4,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.radius,
  },
  reloadText: {
    color: colors.white,
    fontSize: sizes.base,
  },
});
