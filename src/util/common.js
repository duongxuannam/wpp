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

export const randomName = () => Math.random().toString(36).substring(2) + (new Date()).getTime().toString();


// export const convertJSON = (input) => {
//   if (typeof input === 'object') return input;
//   if (isIOS) {
//     console.log('3900', input[3959]);

//     return JSON.parse(`${input.replace('"t,', '').replace('p:\/', '')}`);
//     // return JSON.parse(input);

//   }
//   return JSON.parse(input.replace(/^\s+|\s+$/g, ''));
// };
