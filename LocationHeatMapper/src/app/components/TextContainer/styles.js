import {colors, sizes} from '../../../assets/theme/theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    marginVertical: sizes.base,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    height: sizes.base * 2,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: sizes.radius,
    height: 50,
    width: '100%',
    paddingHorizontal: sizes.base,
  },
  text: {
    fontSize: sizes.base,
    color: colors.black,
  },
  title: {
    fontSize: sizes.base * 1.5,
    fontWeight: 'bold',
    color: 'black',
  },
});
