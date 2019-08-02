import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import SliderEntry from '../../component/SliderEntryDetail';
import { sliderWidth, itemWidth } from '../../component/SliderEntryDetail/styles';

class ListBottom extends Component {


  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.array,
  };



  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          // activeSlideAlignment={'start'}
          containerCustomStyle={{
            overflow: 'visible', // for custom animations
          }}
          contentContainerCustomStyle={{
            alignItems: 'center', // for custom animation
          }}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
          layout={'tinder'}
        // loop={true}
        />



      </View>

    );
  }
}



export default ListBottom;