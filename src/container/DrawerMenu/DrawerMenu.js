import React, { Component } from 'react';
import {
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ItemMenu from '../../component/ItemMenu';

class DrawerMenu extends Component {

  sendMail = () => {
    Linking.openURL('mailto:thuanle.iosdev@gmail.com');
  }

  render() {
    return (
      <LinearGradient
        colors={['#C8CFE9', '#8A98CD', '#8A98CD', '#8592CC']}
        style={{ flex: 1 }}>
        <ItemMenu
          onPress={() => Linking.openURL('https://www.facebook.com/WallPaper-HD-376727922979378/?modal=admin_todo_tour')}
          icon='md-contacts'
          title='Go to community chat'
        />
        <ItemMenu
          onPress={this.sendMail}
          icon='ios-mail'
          title='Email to developer'
        />
        <ItemMenu
          onPress={() => Linking.openURL('mailto:thuanle.iosdev@gmail.com')}
          icon='ios-star'
          title='Rate app'
        />
        <ItemMenu
          onPress={() => Linking.openURL('http://149.28.229.28/api/wallpapers/privacy.html')}
          icon='ios-lock'
          title='Privacy'
        />
        <ItemMenu
          onPress={() => Linking.openURL('http://149.28.229.28/api/wallpapers/copyright.html')}
          icon='ios-create'
          title='Copy right'
        />
      </LinearGradient>

    );
  }
}



export default DrawerMenu;