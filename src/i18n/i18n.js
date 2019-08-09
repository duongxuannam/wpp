// @flow

import I18n from 'react-native-i18n';
import moment from 'moment';
import './languages/moment_vi';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// English language is the main language for fall back:
I18n.translations = {
  en: require('./languages/english.json'),
  vi: require('./languages/vi.json'),
};

let language = I18n.locale.substr(0, 2);
let country = I18n.locale.substr(3, 2) ? I18n.locale.substr(3, 2).toLowerCase() : 'vn';

export const languageCode = language;
export const countryCode = country;

moment.locale(languageCode);