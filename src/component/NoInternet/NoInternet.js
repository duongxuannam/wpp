import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NoInternet extends Component {
  static propTypes = {
    ishow: PropTypes.bool,
  };

  render() {
    let { ishow } = this.props;
    return (
      ishow? 
        (<View style={{
          bottom: 0,
          left: 0,
          right: 0,
          //position: 'absolute',
          backgroundColor: '#e60000',
          //zIndex: 10,
          justifyContent: 'center', alignItems: 'center',
        }}>
          <Text style={{ color: 'white' }} >No Internet Connection</Text>
        </View>): 
        null
    );
  }
}

export default connect(null, null)(NoInternet);