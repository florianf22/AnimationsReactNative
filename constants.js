import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const SPACING = 20;
const AVATAR_SIZE = 35;
const FOOTER_HEIGHT = 50;

const IMAGE_WIDTH = SCREEN_WIDTH * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SPACING,
  AVATAR_SIZE,
  FOOTER_HEIGHT,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
};
