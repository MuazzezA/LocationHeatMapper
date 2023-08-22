import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const colors = {
  white: '#ffffff',
  black: '#000000',
  lightGray: '#d3d3d3',
  red: '#92000A',
  green: '#008000',
};

const sizes = {
  base: 16,
  title: 24,
  radius: 12,
  padding: 20,
  width: width,
  height: height,
};

export {colors, sizes};
