import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles';

export default class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const { data: { illustration }, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: illustration }}
        style={[styles.image, { margin: 1 }]}
      />
    );
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
      // eslint-disable-next-line no-undef
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer]}>
          {this.image}
          {/* <View style={[styles.radiusMask]} /> */}
        </View>

      </TouchableOpacity>
    );
  }
}