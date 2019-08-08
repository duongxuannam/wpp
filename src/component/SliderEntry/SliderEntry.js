import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import { get } from 'lodash';

import styles from './styles';

export default class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    navigation: PropTypes.object,
  };

  get image() {
    const { parallax, parallaxProps, even } = this.props;
    const uri = get(this, ['props', 'data', 'thumb_img_url']);

    return parallax ? (
      <ParallaxImage
        source={{ uri }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri }}
        style={[styles.image, { margin: 1 }]}
      />
    );
  }

  render() {
    const title = get(this, ['props', 'data', 'name']);
    const subtitle = get(this, ['props', 'data', 'downloads']);
    const category = get(this, ['props', 'category'], '');
    const params = category ? {
      func: 'query',
      device: 'iphone',
      page: 1,
      category,
    } : {
      func: 'query',
      device: 'iphone',
      page: 1,
    };

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title]}
        numberOfLines={2}
      >
        {title}
      </Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        // eslint-disable-next-line no-undef
        onPress={() => this.props.navigation.navigate('DetailNavigation', { params, title: category })}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer]}>
          {this.image}
          {/* <View style={[styles.radiusMask]} /> */}
        </View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle]}
            numberOfLines={2}
          >
            Downnload: {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}