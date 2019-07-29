import React, { Component } from 'react';
import {
  View,
  Text,
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
}];



class ListBottom extends Component {


  static propTypes = {
    navigation: PropTypes.object,
  };

  _renderItem = ({ item, index }) => {
    return <TouchableOpacity
      onPress={() => this.props.navigation.navigate('DetailNavigation', {})}
    >
      <View
        style={{
          height: (normalize(125) * ratioScreen),
          width: normalize(125), marginRight: 15,
        }}
        key={index}>
        <Image
          source={{ uri: item.illustration }}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'cover',
          }}
        />
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
      </View>
    </TouchableOpacity>;
  }

  render() {
    return (

      <View style={{}}>
        <Text style={{
          marginTop: 10, fontSize: 15,
          color: 'white', marginLeft: 25,
        }}>Top downloads</Text>



        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            margin: 20,
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