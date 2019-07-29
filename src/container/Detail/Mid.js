import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../component/SliderEntryDetail';

import { sliderWidth, itemWidth } from '../../component/SliderEntryDetail/styles';


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
},
{
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

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


        <Carousel
          data={ENTRIES2}
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
          loop={true}
        />



      </View>

    );
  }
}



export default ListBottom;