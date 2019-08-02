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

class ListBottom extends Component {


  static propTypes = {
    navigation: PropTypes.object,
    topDownload: PropTypes.array,
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
          source={{ uri: item.thumb_img_url }}
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
            {item.name}
          </Text>
          <Text
            style={{
              fontWeight: '600', color: 'white',
              fontSize: normalize(13), marginTop: 4,
              textAlign: 'center',
            }}
          >
            Download {item.downloads}
          </Text>
        </View>
      </View>
    </TouchableOpacity>;
  }

  render() {
    const { topDownload } = this.props;
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
          data={topDownload}
          renderItem={this._renderItem}
        />

      </View>

    );
  }
}



export default ListBottom;