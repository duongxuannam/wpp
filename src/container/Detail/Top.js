import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import ItemTop from './ItemTop';

class ListBottom extends PureComponent {


  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.array,
    scrollToImage: PropTypes.func,
    loadMoreDetails: PropTypes.func,
    isDetailsLoadingMore: PropTypes.bool,
  };

  _renderItem = ({ item, index }) => {
    const { scrollToImage, isDetailsLoadingMore, data } = this.props;
    return <ItemTop dataLength={data.length} scrollToImage={scrollToImage}
      item={item} index={index} isDetailsLoadingMore={isDetailsLoadingMore}
    />;
  }



  render() {
    const { data, loadMoreDetails } = this.props;
    const dataLength = data.length;
    return (
      <View style={{ backgroundColor: '#6D77A7', paddingLeft: 20 }}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 10,
          }}
          keyExtractor={(item) => item.id.toString()}
          data={data}
          extraData={dataLength}
          renderItem={this._renderItem}
          onEndReached={loadMoreDetails}
          onEndReachedThreshold={0.2}
          removeClippedSubviews={true}
        // ListFooterComponent={this.renderFooter}
        />


      </View>

    );
  }
}



export default ListBottom;