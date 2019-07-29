import React, { Component } from 'react';
import {
  View, Dimensions, TouchableOpacity, Text, Image, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

import { isIOS, normalize } from '../../util/common';

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


class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    snapToNext: PropTypes.func,
  };

  get image() {
    const { data: { illustration } } = this.props;

    return (
      <Image
        source={{ uri: illustration }}
        style={{
          ...StyleSheet.absoluteFillObject,
          resizeMode: 'cover',
        }}
      />
    );
  }

  render() {
    const { data: { title } } = this.props;
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
        onPress={() => this.props.snapToNext()}

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
          paddingTop: 20 - 8,
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



  _renderItem = ({ item, index }) => {
    return <SliderEntry
      index={index}
      snapToNext={() => {
        console.log(index, this._carousel.snapToItem);
        this._carousel.snapToItem(index + 1);
      }}
      data={item} even={(index + 1) % 2 === 0} />;
  }



  render() {
    return (

      <View style={{ backgroundColor: '#6D77A7', paddingVertical: 10 }}>
        <Carousel
          data={ENTRIES2}
          ref={(c) => { this._carousel = c; }}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={normalize(100)}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          loop={true}
          //   activeSlideAlignment={'start'}
          containerCustomStyle={{
            // marginTop: 15,
            overflow: 'visible',
          }}
          contentContainerCustomStyle={{ paddingVertical: 10 }}
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