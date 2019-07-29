import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { ratioScreen, normalize } from '../../util/common';


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



class ListBottom extends Component {


  static propTypes = {
    navigation: PropTypes.object,
  };

  _renderItem = ({ item, index }) => {
    return <TouchableOpacity >
      <View
        style={{
          height: (normalize(30) * ratioScreen),
          width: normalize(30), marginRight: 15,
          backgroundColor: 'white',
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
    </TouchableOpacity>;
  }

  render() {
    return (

      <View style={{ backgroundColor: '#6D77A7', paddingLeft: 20 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={ENTRIES2}
          renderItem={this._renderItem}
        />

      </View>

    );
  }
}



export default ListBottom;