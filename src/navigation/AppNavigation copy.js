import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import HomeNavigation from './HomeNavigation';
import DetailNavigation from './DetailNavigation';
import SearchNavigation from './SearchNavigation';
import DrawerMenu from '../container/DrawerMenu';


const MainStack = createStackNavigator({
  HomeNavigation: { screen: HomeNavigation },
  DetailNavigation: { screen: DetailNavigation },
  SearchNavigation: { screen: SearchNavigation },

}, {
  initialRouteName: 'HomeNavigation',
  headerMode: 'none',
});

const DrawerNavigator = createDrawerNavigator({ screen: MainStack }, {
  hideStatusBar: true,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: '#6b52ae',
  drawerType: 'slide',
  contentComponent: <DrawerMenu />,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  },
});


const RootStack = createStackNavigator(
  {
    Main: { screen: DrawerNavigator },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export default AppContainer;