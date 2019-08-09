import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import { ratioScreen, normalize } from '../../util/common';

class ListBottom extends PureComponent {


  static propTypes = {
    navigation: PropTypes.object,
    topDownload: PropTypes.array,
    loadMoreTopDownloadRequest: PropTypes.func,
    isTopDownloadLoadingMore: PropTypes.bool,
  };

  _renderItem = ({ item, index }) => {
    const params = {
      func: 'query',
      device: 'iphone',
      page: 1,
      order: 'download',
    };
    const title = item.name;
    const { topDownload, isTopDownloadLoadingMore } = this.props;
    const topDownloadLength = topDownload.length;

    return <React.Fragment>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailNavigation', { params, title: 'Top Download' })}
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
              backgroundColor: '#D0CDCE',
            }}
            resizeMethod="resize"
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
              {title}
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
      </TouchableOpacity>
      {isTopDownloadLoadingMore && index + 1 === topDownloadLength &&
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: (normalize(125) * ratioScreen),
          marginRight: 20,
        }}>
          <ActivityIndicator
            size='large'
            color='black'
          // style={{ height: 70 }}
          />
        </View>
      }
    </React.Fragment>;
  }

  render() {
    const { topDownload, loadMoreTopDownloadRequest } = this.props;
    const topDownloadLength = topDownload.length;
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
            margin: 20, paddingRight: 20,
          }}
          extraData={topDownloadLength}
          keyExtractor={(item) => item.id.toString()}
          data={topDownload}
          renderItem={this._renderItem}
          onEndReached={loadMoreTopDownloadRequest}
          onEndReachedThreshold={0.2}
        />

      </View>

    );
  }
}



export default ListBottom;