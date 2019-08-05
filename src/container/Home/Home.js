import React, { Component } from 'react';
import {
  View,
  ScrollView, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { get } from 'lodash';
import { connect } from 'react-redux';

import Header from './Header';
import ListMid from './ListMid';
import ListTop from './ListTop';
import ListBottom from './ListBottom';
import DrawerMenu from '../DrawerMenu';
import { normalize } from '../../util/common';
import HomeActions from '../../redux/homeRedux';

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    getNewsRequest: PropTypes.func,
    news: PropTypes.array,

    getTopRequest: PropTypes.func,
    topDownload: PropTypes.array,
  };

  static navigationOptions = ({ navigation }) => {
    const toggleDrawer = get(navigation, ['state', 'params', 'toggleDrawer']);

    return {
      headerTitle: (
        <Header
          navigation={navigation}
        />
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => {
          toggleDrawer();
        }} >
          <Icon name='md-more' style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={25} />
        </TouchableOpacity >

      ),
      headerRight: (
        <TouchableOpacity style={{ zIndex: 100 }} onPress={() => navigation.navigate('SearchNavigation')}>
          <Icon name='ios-search' style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={25} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#6D77A7',
        // height: normalizeHeight(60),
        borderBottomWidth: 0,
        elevation: 0,
      },
    };
  }



  componentDidMount() {
    const { navigation, getNewsRequest, getTopRequest } = this.props;
    const { setParams } = navigation;

    setParams({
      toggleDrawer: this.toggleDrawer,
    });
    const params = {
      func: 'query',
      device: 'iphone',
      page: 0,
    };
    // getNewsRequest(params);

    // getTopRequest();

  }

  renderDrawer = () => {
    return <DrawerMenu />;
  };

  toggleDrawer = () => {
    this.drawer.openDrawer();
  }

  render() {
    const { navigation, news, topDownload } = this.props;
    return (
      <View flex={1}>
        <DrawerLayout
          keyboardDismissMode="on-drag"

          ref={drawer => {
            this.drawer = drawer;
          }}
          drawerBackgroundColor='rgba(255,255,255,.9)'
          overlayColor='#6b52ae'
          drawerType='slide'
          drawerWidth={normalize(300)}

          renderNavigationView={this.renderDrawer}>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
            locations={[0, 0.2, 0.3, 0.4]}
            colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
            style={{ flex: 1 }}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}>
              {/* {news.length > 0 && <ListTop news={news} />} */}
              <ListMid />
              {/* <ListBottom navigation={navigation} topDownload={topDownload} /> */}
            </ScrollView>
          </LinearGradient>
        </DrawerLayout>

      </View >
    );
  }
}



const mapStateToProps = (state) => ({
  news: get(state, ['home', 'news'], []),
  isNewsRefreshing: get(state, ['home', 'isNewsRefreshing']),
  isNewsLoadingMore: get(state, ['home', 'isNewsLoadingMore']),
  newsHasMore: get(state, ['home', 'newsHasMore']),
  newsPage: get(state, ['home', 'newsPage']),

  topDownload: get(state, ['home', 'topDownload'], []),
  isTopDownloadLoading: get(state, ['home', 'isTopDownloadLoading']),

});
const mapDispatchToProps = (dispatch) => ({
  getNewsRequest: (params, success, error) => dispatch(HomeActions.getNewsRequest(params, success, error)),
  getTopRequest: (success, error) => dispatch(HomeActions.getTopRequest(success, error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



