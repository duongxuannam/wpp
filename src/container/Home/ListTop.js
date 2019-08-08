import React, { Component } from 'react';
import {
  View, Dimensions, TouchableOpacity, Text, Image, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { isIOS, normalize, normalizeHeight } from '../../util/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

// eslint-disable-next-line no-unused-vars
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;




class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    snapToNext: PropTypes.func,
    setCategory: PropTypes.func,
  };

  get image() {
    const uri = get(this, ['props', 'data', 'image']);
    return (
      <Image
        source={{ uri }}
        style={{
          ...StyleSheet.absoluteFillObject,
          resizeMode: 'cover',
          backgroundColor: '#D0CDCE',
        }}
      />
    );
  }

  render() {
    const title = get(this, ['props', 'data', 'name']);
    const { setCategory } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: normalize(100),
          height: normalize(150),
          paddingHorizontal: normalize(5),
          paddingBottom: 5, // needed for shadow
        }}
        // eslint-disable-next-line no-undef
        onPress={() => {
          this.props.snapToNext();
          setCategory(title)();
        }}
      >
        <View style={{
          position: 'absolute',
          top: 0,
          left: normalize(5),
          right: normalize(5),
          bottom: 18,
          shadowColor: '#1a1917',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          borderRadius: 8,
        }} />
        <View style={[{
          flex: 1,
          marginBottom: isIOS ? 0 : -1, // Prevent a random Android rendering issue

        },
        ]}>
          {this.image}
          <View style={[{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
          },
          ]} />
        </View>
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center',
          height: normalizeHeight(30),
          paddingTop: 8,
          paddingBottom: 10,
          paddingHorizontal: 16,
        }]}>
          <Text
            numberOfLines={2}
            style={{ textAlign: 'center', color: 'white', fontSize: 12, fontWeight: '400' }}
          >
            {title}
          </Text>

        </View>
      </TouchableOpacity >
    );
  }
}

class ListTop extends Component {

  static propTypes = {
    categories: PropTypes.array,
    loadMoreCategoriesRequest: PropTypes.func,
    setCategory: PropTypes.func,
  };

  _renderItem = ({ item, index }) => {
    const { setCategory } = this.props;
    return <SliderEntry
      index={index}
      setCategory={setCategory}
      snapToNext={() => {
        // console.log(index, this._carousel.snapToNext);
        // this._carousel.snapToItem(index);
        setTimeout(() => this._carousel.snapToItem(index), 250);

      }}
      data={item} even={(index + 1) % 2 === 0} />;
  }


  render() {
    const { categories, loadMoreCategoriesRequest } = this.props;
    return (
      <View style={{ backgroundColor: '#6D77A7' }}>
        <Carousel
          data={categories}
          onEndReachedThreshold={0.2} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700

          onEndReached={() => { // problem
            // console.log(distanceFromEnd); // 607, 878 
            // console.log('reached'); // once, and if I scroll about 14% of the screen, 
            loadMoreCategoriesRequest();
          }}
          ref={(c) => { this._carousel = c; }}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={normalize(100)}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          firstItem={2}
          // loop={true}
          // activeSlideAlignment={'start'}
          containerCustomStyle={{
            // marginTop: 15,
            overflow: 'visible',
          }}
          // contentContainerCustomStyle={{ paddingVertical: 10 }}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
      </View>

    );
  }
}



export default ListTop;