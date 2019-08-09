import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import { ratioScreen, normalize } from '../../util/common';

class ItemTop extends PureComponent {

  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    scrollToImage: PropTypes.func,
    isDetailsLoadingMore: PropTypes.bool,
    dataLength: PropTypes.number,
  };

  render() {
    const { scrollToImage, index, item, isDetailsLoadingMore, dataLength } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity onPress={scrollToImage(index)}>
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
              resizeMethod="resize"
            />
          </View>
        </TouchableOpacity>
        {isDetailsLoadingMore && index + 1 === dataLength &&
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: (normalize(30) * ratioScreen),
            marginRight: 20,
          }}>
            <ActivityIndicator
              size='small'
              color='black'
            // style={{ height: 70 }}
            />
          </View>
        }
      </React.Fragment>
    );
  }
}



export default ItemTop;