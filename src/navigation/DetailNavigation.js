// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Detail from '../container/Detail';

import { ApplicationStyles } from '../theme';

const DetailNavigation = createStackNavigator({
  Detail: { screen: Detail },
}, {
  initialRouteName: 'Detail',
  headerMode: 'float',
  defaultNavigationOptions: {
    headerStyle: ApplicationStyles.headerStyle,
    headerTitleStyle: ApplicationStyles.headerTitleStyle,
  },
});

export default DetailNavigation;