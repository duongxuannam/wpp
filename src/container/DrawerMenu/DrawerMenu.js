import React, { Component } from 'react';
import {
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ItemMenu from '../../component/ItemMenu';

class DrawerMenu extends Component {

  render() {
    return (
      <LinearGradient
        colors={['#C8CFE9', '#8A98CD', '#8A98CD', '#8592CC']}
        style={{ flex: 1 }}>
        <ItemMenu
          icon='md-contacts'
          title='Go to community chat'
        />
        <ItemMenu
          icon='ios-mail'
          title='Email to developer'
        />
        <ItemMenu
          icon='ios-star'
          title='Rate app'
        />
        <ItemMenu
          icon='ios-lock'
          title='Privacy'
        />
        <ItemMenu
          icon='ios-create'
          title='Copy right'
        />
      </LinearGradient>

    );
  }
}



export default DrawerMenu;