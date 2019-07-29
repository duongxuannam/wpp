import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { normalize } from '../../util/common';






class Bottom extends Component {



  render() {
    return (

      <View style={{
        backgroundColor: '#6D77A7', flexDirection: 'row',
      }}>
        <View style={{
          flex: 1, marginVertical: 15,

          paddingLeft: normalize(30),
        }}>
          <TouchableOpacity
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
      </View>

    );
  }
}



export default Bottom;