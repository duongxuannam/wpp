import React, { Component } from 'react';
import {
  NetInfo,
  View,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import AppNavigation from '../../navigation/AppNavigation';
import NavigationService from '../../navigation/NavigationService';
import Indicator from '../../component/Indicator';
// import NoInternet from '../../component/NoInternet';


class RootContainer extends Component {

  async componentDidMount() {

    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 200,
    });
    try {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
      NetInfo.isConnected.fetch().done(this.handleConnectivityChange);
    } catch (error) { } //eslint-disable-line
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    });
  }

  handleConnectivityChange = isConnected => {
    try {
      // eslint-disable-next-line react/prop-types
      const { changeNetInfo } = this.props;
      changeNetInfo(isConnected);
    } catch (error) { } //eslint-disable-line
  };

  async componentWillUnmount() {
    try {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    } catch (error) { } //eslint-disable-line
  }




  render() {
    return (
      <View flex={1}>

        <StatusBar backgroundColor='#6D77A7' barStyle="dark-content" />
        <View flex={1}>
          <AppNavigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>

        <Indicator />

        {/* <NoInternet ishow={!isConnected} /> */}
      </View>

    );
  }
}



export default RootContainer;