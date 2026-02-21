import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
  };


  render() {
    const { title } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }} >
        <Text style={{
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
        }}>
          {title}
        </Text>
      </View>);
  }
}

