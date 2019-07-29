import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Header from './Header';
import Top from './Top';
import Mid from './Mid';
import Bottom from './Bottom';

class Detail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Header
          navigation={navigation}
          title='Abstract'
        />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
        >
          <Icon name='ios-arrow-back' style={[{
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
          <Icon name='ios-create' style={[{
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
    return (
      <View flex={1} >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          <Top />
          <Mid />
          <Bottom />
        </LinearGradient>
      </View>
    );
  }
}



export default Detail;