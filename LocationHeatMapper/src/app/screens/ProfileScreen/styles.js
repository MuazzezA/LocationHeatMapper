import {StyleSheet} from 'react-native';
import {sizes, colors} from '../../../assets/theme/theme';
export default StyleSheet.create({
  safearea: {
    flex: 1,
  },
  body: {
    padding: sizes.padding,
    flex: 1,
  },
  title: {
    fontSize: sizes.title * 1.5,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
    marginBottom: sizes.padding,
  },
  logoutButton: {
    position: 'absolute',
    bottom: sizes.padding,
    width: sizes.width - sizes.padding * 2,
    height: 50,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.radius,
  },
  logoutText: {
    fontSize: sizes.base,
    fontWeight: 'bold',
    color: colors.lightGray,
  },
});
