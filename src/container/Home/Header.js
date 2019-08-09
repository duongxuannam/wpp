import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class Header extends PureComponent {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }} >
        <Text style={{
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
        }}>
          Wallpaper
        </Text>
      </View>);
  }
}

