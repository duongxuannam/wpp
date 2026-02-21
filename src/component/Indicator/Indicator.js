import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './IndicatorStyles';
import { Colors } from '../../theme';

class Indicator extends Component {
  static propTypes = {
    isShowingIndicator: PropTypes.bool,
    hideIndicator: PropTypes.func,
  };


  render() {
    const { isShowingIndicator } = this.props;
    return (
      isShowingIndicator ? <View style={styles.absoluteTransparent}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ActivityIndicator animating={true} color={Colors.white} size='small' />
          </View>
        </View>
      </View> : null
    );
  }
}

const select = (state) => ({
  isShowingIndicator: state.app.isShowingIndicator,
});


export default connect(select, null)(Indicator);