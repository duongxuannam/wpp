import { Dimensions, Platform } from 'react-native';

export const window = Dimensions.get('window');
const scale = window.width / 375;
const scaleHeight = window.height / 667;


export const windowWidth = window.width;

export const windowHeight = window.height;

export const ratioScreen = windowHeight / windowWidth;


export const normalize = (size) => {
  return Math.round(scale * size);
};

export const percentWidth = (percent) => {
  return Math.round(percent * window.width / 100);
};

export const normalizeHeight = (size) => {
  return Math.round(scaleHeight * size);
};

export const isIOS = Platform.OS === 'ios';
