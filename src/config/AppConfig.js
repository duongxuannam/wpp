// Simple React Native specific changes
import { YellowBox } from 'react-native';

import '../i18n/i18n';

YellowBox.ignoreWarnings(['Require cycle:']);
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseURL: __DEV__ ? 'https://api-staging.weva.vn' : 'https://api.weva.vn',
  //baseURL: __DEV__ ? 'http://localhost:3000/' : 'https://b594d858.ngrok.io',
};
