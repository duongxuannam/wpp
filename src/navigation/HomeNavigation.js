// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../container/Home';

import { ApplicationStyles } from '../theme';

const HomeNavigation = createStackNavigator({
  Home: { screen: Home },
}, {
  initialRouteName: 'Home',
  headerMode: 'float',
  defaultNavigationOptions: {
    headerStyle: ApplicationStyles.headerStyle,
    headerTitleStyle: ApplicationStyles.headerTitleStyle,
  },
});

export default HomeNavigation;