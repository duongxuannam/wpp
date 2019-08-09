import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { normalize } from '../../util/common';

class ItemMenu extends Component {
  static propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.any,

  };

  render() {
    const { style, title, onPress, icon } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}>
        <View style={[{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }, style]}>
          <Icon name={icon} style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={40} />

          <Text style={{
            marginLeft: 10,
            color: 'white', fontSize: normalize(16), fontWeight: '400',
          }} >
            {title}
          </Text>

        </View>
      </TouchableOpacity>

    );
  }
}

export default connect(null, null)(ItemMenu);