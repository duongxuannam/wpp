import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { normalize } from '../../util/common';

export default class Header extends PureComponent {

  static propTypes = {
    navigation: PropTypes.object,
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row', alignItems: 'center',
      }} >
        <View style={{
          flex: 1, backgroundColor: 'white',
          paddingHorizontal: normalize(10),
          borderRadius: 10, flexDirection: 'row',
          alignItems: 'center',
          margin: normalize(8),
        }}>

          <Icon name='ios-search' style={[{
            color: '#DFDDE0',
          }]} size={25} />
          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(8),

            }}
          />
          <Icon name='md-close-circle' style={[{
            color: '#DFDDE0',
          }]} size={25} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text
            style={[{
              fontSize: 15,
              fontWeight: '400',
              color: 'white',
              marginRight: normalize(8),
            }]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>);
  }
}

