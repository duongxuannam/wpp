import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Header from './Header';
import ListMid from './ListMid';
import ListTop from './ListTop';
import ListBottom from './ListBottom';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = (navigation) => {
    return {
      headerTitle: (
        <Header
          navigation={navigation}
        />
      ),
      headerLeft: (
        <TouchableOpacity>
          <Icon name='md-more' style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={25} />
        </TouchableOpacity>

      ),
      headerRight: (
        <TouchableOpacity>
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


  render() {
    const { navigation } = this.props;
    return (
      <View flex={1}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <ListTop />
            <ListMid />
            <ListBottom navigation={navigation} />
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}



export default Home;