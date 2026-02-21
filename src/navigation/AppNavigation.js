import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeNavigation from './HomeNavigation';
import DetailNavigation from './DetailNavigation';
import SearchNavigation from './SearchNavigation';


const MainStack = createStackNavigator({
  HomeNavigation: { screen: HomeNavigation },
  DetailNavigation: { screen: DetailNavigation },
  SearchNavigation: { screen: SearchNavigation },

}, {
  initialRouteName: 'HomeNavigation',
  headerMode: 'none',
});

const RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export default AppContainer;