import React, { Component } from 'react';
import {
  View, FlatList, TouchableOpacity, Image, StyleSheet, Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppActions from '../../redux/appRedux';
import Header from './Header';
import { normalizeHeight, normalize, ratioScreen, windowWidth } from '../../util/common';


const ENTRIES2 = [{
  title: 'Favourites landscapes 1',
  subtitle: 'Lorem ipsum dolor sit amet',
  illustration: 'https://i.imgur.com/SsJmZ9jl.jpg',
},
{
  title: 'Favourites landscapes 2',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  illustration: 'https://i.imgur.com/5tj6S7Ol.jpg',
},
{
  title: 'Favourites landscapes 3',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat',
  illustration: 'https://i.imgur.com/pmSqIFZl.jpg',
},
{
  title: 'Favourites landscapes 4',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  illustration: 'https://i.imgur.com/cA8zoGel.jpg',
},
{
  title: 'Favourites landscapes 5',
  subtitle: 'Lorem ipsum dolor sit amet',
  illustration: 'https://i.imgur.com/pewusMzl.jpg',
},
{
  title: 'Favourites landscapes 6',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat',
  illustration: 'https://i.imgur.com/l49aYS3l.jpg',
},
{
  title: 'Favourites landscapes 1',
  subtitle: 'Lorem ipsum dolor sit amet',
  illustration: 'https://i.imgur.com/SsJmZ9jl.jpg',
},
{
  title: 'Favourites landscapes 2',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  illustration: 'https://i.imgur.com/5tj6S7Ol.jpg',
},
{
  title: 'Favourites landscapes 3',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat',
  illustration: 'https://i.imgur.com/pmSqIFZl.jpg',
},
{
  title: 'Favourites landscapes 4',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  illustration: 'https://i.imgur.com/cA8zoGel.jpg',
},
{
  title: 'Favourites landscapes 5',
  subtitle: 'Lorem ipsum dolor sit amet',
  illustration: 'https://i.imgur.com/pewusMzl.jpg',
},
{
  title: 'Favourites landscapes 6',
  subtitle: 'Lorem ipsum dolor sit amet et nuncat',
  illustration: 'https://i.imgur.com/l49aYS3l.jpg',
}];

const widthItem = (windowWidth - normalize(70)) / 2;



class Search extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Header
          navigation={navigation}
          title='Search'
        />
      ),
      headerStyle: {
        backgroundColor: '#6D77A7',
        height: normalizeHeight(60),
        borderBottomWidth: 0,
        elevation: 0,
        // flex: 1,
      },
    };
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    const styleIndex = index % 2 === 0 ? { marginRight: normalize(20) } : { marginLeft: normalize(20) };
    return (
      <View key={index} style={[{
        flex: 1,
        marginVertical: 20,
        alignItems: 'center',
      }, styleIndex]}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailNavigation')} >
          <View
            style={{
              height: (widthItem * ratioScreen),
              width: widthItem,
            }}
            key={index}>
            <Image
              source={{ uri: item.illustration }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: 'cover', margin: 1,
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={{
          position: 'absolute', bottom: 0, right: 0, left: 0,
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          height: normalize(75),
          justifyContent: 'center',
        }}>
          <Text style={{
            fontWeight: '600', color: 'white',
            fontSize: normalize(14),
            textAlign: 'center',
          }}>
            Name album
          </Text>
          <Text
            style={{
              fontWeight: '600', color: 'white',
              fontSize: normalize(13), marginTop: 4,
              textAlign: 'center',
            }}
          >
            Download 125.5k
          </Text>
        </View>

      </View >
    );
  }

  render() {
    return (
      <View flex={1} >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          <FlatList
            data={ENTRIES2}
            numColumns={2}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
            style={{ marginHorizontal: normalize(15) }}
            showsVerticalScrollIndicator={false}
          />


        </LinearGradient>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showIndicator: () => dispatch(AppActions.showIndicator()),
  hideIndicator: () => dispatch(AppActions.hideIndicator()),
  showError: (mess) => dispatch(AppActions.showError(mess)),
  showSuccess: (mess) => dispatch(AppActions.showSuccess(mess)),
});

export default connect(null, mapDispatchToProps)(Search);

