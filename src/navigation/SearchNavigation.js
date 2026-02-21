// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Search from '../container/Search';

import { ApplicationStyles } from '../theme';

const SearchNavigation = createStackNavigator({
  Search: { screen: Search },
}, {
  initialRouteName: 'Search',
  headerMode: 'float',
  defaultNavigationOptions: {
    headerStyle: ApplicationStyles.headerStyle,
    headerTitleStyle: ApplicationStyles.headerTitleStyle,
  },
});

export default SearchNavigation;