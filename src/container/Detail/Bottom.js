import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { normalize } from '../../util/common';


class Bottom extends Component {

  static propTypes = {
    downloadFile: PropTypes.func,
    nextImage: PropTypes.func,
  };


  render() {
    const { downloadFile, nextImage } = this.props;
    return (

      <View style={{
        backgroundColor: '#6D77A7', flexDirection: 'row',
      }}>
        <View style={{
          flex: 1, marginVertical: 15,

          paddingLeft: normalize(30),
        }}>
          <TouchableOpacity
            onPress={nextImage}
          >
            <Icon name='md-close' style={[{
              color: 'white',
              backgroundColor: 'transparent',
              paddingHorizontal: 5,
              marginHorizontal: 8,
              paddingVertical: 5,
            }]} size={35} />
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1, marginVertical: 15,
          alignItems: 'flex-end', paddingRight: normalize(30),
        }}>
          <TouchableOpacity
            onPress={downloadFile}
          >
            <Icon name='md-checkmark' style={[{
              color: 'white',
              backgroundColor: 'transparent',
              paddingHorizontal: 5,
              marginHorizontal: 8,
              paddingVertical: 5,
            }]} size={35} />
          </TouchableOpacity>
        </View>
      </View >

    );
  }
}



export default Bottom;