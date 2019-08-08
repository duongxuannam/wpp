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

class ListBottom extends Component {


  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.array,
    scrollToImage: PropTypes.func,
    loadMoreDetails: PropTypes.func,
  };

  _renderItem = ({ item, index }) => {
    const { scrollToImage } = this.props;
    return <TouchableOpacity onPress={scrollToImage(index)}>
      <View
        style={{
          height: (normalize(30) * ratioScreen),
          width: normalize(30), marginRight: 15,
          backgroundColor: 'white',
        }}
        key={index}>
        <Image
          source={{ uri: item.thumb_img_url }}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'cover', margin: 1,
          }}
        />
      </View>
    </TouchableOpacity>;
  }

  render() {
    const { data, loadMoreDetails } = this.props;
    return (
      <View style={{ backgroundColor: '#6D77A7', paddingLeft: 20 }}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={this._renderItem}
          onEndReached={loadMoreDetails}
          onEndReachedThreshold={0.2}
        />


      </View>

    );
  }
}



export default ListBottom;