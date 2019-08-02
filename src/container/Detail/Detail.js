import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import PropTypes from 'prop-types';

import AppActions from '../../redux/appRedux';
import Header from './Header';
import Top from './Top';
import Mid from './Mid';
import Bottom from './Bottom';
import { randomName, isIOS } from '../../util/common';
import { dataDetail } from '../../util/constant';

class Detail extends Component {
  static propTypes = {
    showIndicator: PropTypes.func,
    hideIndicator: PropTypes.func,
    showError: PropTypes.func,
    showSuccess: PropTypes.func,
  };


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Header
          navigation={navigation}
          title='Abstract'
        />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
        >
          <Icon name='ios-arrow-back' style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={25} />
        </TouchableOpacity>

      ),
      headerRight: (
        <TouchableOpacity>
          <Icon name='ios-create' style={[{
            color: 'white',
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginHorizontal: 8,
            paddingVertical: 5,
          }]} size={25} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#6D77A7',
        // height: normalizeHeight(60),
        borderBottomWidth: 0,
        elevation: 0,
      },
    };
  }

  actualAndroidDownload = () => {
    const { showIndicator, hideIndicator, showError, showSuccess } = this.props;
    this.setState({
      progress: 0,
      loading: true,
    });
    showIndicator();
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DownloadDir + `/${randomName()}.png`,
      fileCache: true,
    })
      .fetch(
        'GET',
        'http://149.28.229.28//images_data/10669651.jpg',
        {
          //some headers ..
        }
      )
      .progress((received, total) => {
        // console.log('progress', received / total);
        this.setState({ progress: received / total });
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        // console.log('res ', res);
        // console.log('res ', res.path());
        hideIndicator();
        showSuccess('Download success');
        this.setState({
          progress: 100,
          loading: false,
        });
        this.nextImage();
      })
      .catch(e => {
        hideIndicator();
        showError('Download failed');
        console.log('e ', e);
      })
    ;
  };

  actualIosDownload = () => {
    const { showIndicator, hideIndicator, showError, showSuccess } = this.props;
    this.setState({
      progress: 0,
      loading: true,
    });
    showIndicator();
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DocumentDir + `/${randomName()}.png`,
      fileCache: true,
    })
      .fetch(
        'GET',
        'http://149.28.229.28//images_data/10669651.jpg',
        {
          //some headers ..
        }
      )
      .progress((received, total) => {
        console.log('progress', received / total);
        this.setState({ progress: received / total });
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        // console.log('res ', res);
        // console.log('res ', res.path());
        hideIndicator();
        showSuccess('Download success');
        this.setState({
          progress: 100,
          loading: false,
        });
        this.nextImage();
      })
      .catch(e => {
        hideIndicator();
        showError('Download failed');
        console.log('e ', e);
      })
    ;
  };

  downloadFile = async () => {
    if (isIOS) {
      return this.actualIosDownload();
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualAndroidDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file'
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  nextImage = () => {
    this.midComponent._carousel.snapToNext();
  }

  scrollToImage = (index) => () => {
    this.topComponent.flatListRef.scrollToIndex({ animated: true, index: '' + index });
    this.midComponent._carousel.snapToItem(index);
  }


  render() {
    return (
      <View flex={1} >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          <Top data={dataDetail}
            ref={(topComponent) => { this.topComponent = topComponent; }}
            scrollToImage={this.scrollToImage} />
          <Mid data={dataDetail}
            ref={(midComponent) => { this.midComponent = midComponent; }}
          />
          <Bottom
            downloadFile={this.downloadFile}
            nextImage={this.nextImage} />
        </LinearGradient>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showIndicator: () => dispatch(AppActions.showIndicator()),
  hideIndicator: () => dispatch(AppActions.hideIndicator()),
  showError: (mess) => dispatch(AppActions.showError(mess)),
  showSuccess: (mess) => dispatch(AppActions.showSuccess(mess)),
});

export default connect(null, mapDispatchToProps)(Detail);

