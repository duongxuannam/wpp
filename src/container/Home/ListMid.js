import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

import SliderEntry from '../../component/SliderEntry';
import { sliderWidth, itemWidth } from '../../component/SliderEntry/styles';

class ListMid extends PureComponent {
  static propTypes = {
    news: PropTypes.array,
    navigation: PropTypes.object,
    category: PropTypes.any,
  };

  _renderItem = ({ item, index }) => {
    const { navigation, category } = this.props;
    return <SliderEntry
      category={category}
      navigation={navigation} data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    const { news } = this.props;
    return (
      <View style={{ marginTop: 10 }}>
        <Carousel
          data={news}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          // activeSlideAlignment={'start'}
          containerCustomStyle={{
            marginTop: 15,
            overflow: 'visible', // for custom animations
          }}
          contentContainerCustomStyle={{
            paddingVertical: 10, // for custom animation
          }}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
          layout={'stack'}
        // loop={true}
        />
      </View>

    );
  }
}



export default ListMid;