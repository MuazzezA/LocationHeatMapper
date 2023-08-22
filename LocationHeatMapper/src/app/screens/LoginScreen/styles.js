import {StyleSheet} from 'react-native';
import {sizes, colors} from '../../../assets/theme/theme';
export default StyleSheet.create({
  root: {
    flex: 1,
    padding: sizes.padding,
  },
  title: {
    fontSize: sizes.title * 1.5,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: sizes.padding,
    width: sizes.width - sizes.padding * 2,
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.radius,
  },
  buttonText: {
    fontSize: sizes.base,
    fontWeight: 'bold',
    color: colors.lightGray,
  },
  infotTextContainer: {
    marginTop: sizes.padding * 3,
  },
});
