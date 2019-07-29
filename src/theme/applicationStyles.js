import { Platform } from 'react-native';

import Colors from './color';

const ApplicationStyles = {
  screen: {
    container: {
      flex: 1,
    },
    tabBarIcon: {
      height: 26,
      width: 26,
    },
  },
  headerStyle: {
    height: 60,
    shadowColor: 'rgba(94,116,160,0.2)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 1.0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: Colors.primary,
    fontSize: 17,
    paddingHorizontal: 10,
  },
  shadowView: {
    shadowColor: '#a0a3a5',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: Platform.OS === 'ios' ? 0 : 1.5,
  },
};

export default ApplicationStyles;
