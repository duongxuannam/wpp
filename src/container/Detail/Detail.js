import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid, Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import AppActions from '../../redux/appRedux';
import DetailActions from '../../redux/detailRedux';

import Header from './Header';
import Top from './Top';
import Mid from './Mid';
import Bottom from './Bottom';
import { randomName, isIOS, normalizeHeight } from '../../util/common';

class Detail extends Component {
  static propTypes = {
    showIndicator: PropTypes.func,
    hideIndicator: PropTypes.func,
    showError: PropTypes.func,
    showSuccess: PropTypes.func,
    navigation: PropTypes.object,

    getDetailRequest: PropTypes.func,
    details: PropTypes.array,
    clearDataDetail: PropTypes.func,
    detailsPage: PropTypes.number,
    isDetailsLoadingMore: PropTypes.bool,
    isDetailsRefreshing: PropTypes.bool,
    detailsHasMore: PropTypes.bool,
  };


  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, ['state', 'params', 'title']);
    return {
      headerTitle: (
        <Header
          navigation={navigation}
          title={title ? title : 'New'}
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

  constructor(props) {
    super(props);
    this.state = {
      indexImage: 0,
    };
  }

  componentDidMount() {
    const params = get(this, ['props', 'navigation', 'state', 'params', 'params']);
    const { getDetailRequest } = this.props;
    // const params = {
    //   func: 'query',
    //   device: 'iphone',
    //   page: 1,
    //   order: 'download',
    // };
    getDetailRequest(params);
  }

  loadMoreDetails = () => {
    const {
      detailsPage,
      detailsHasMore,
      isDetailsLoadingMore,
      isDetailsRefreshing,
      getDetailRequest,
    } = this.props;
    const params = get(this, ['props', 'navigation', 'state', 'params', 'params']);

    // const params = {
    //   func: 'query',
    //   device: 'iphone',
    //   page: 1,
    //   order: 'download',
    // };
    params.page = detailsPage + 1;
    if (!isDetailsLoadingMore && !isDetailsRefreshing && detailsHasMore) {
      getDetailRequest(params);
    }
  }

  componentWillUnmount() {
    const { clearDataDetail } = this.props;
    clearDataDetail();
  }

  actualAndroidDownload = () => {
    const { indexImage } = this.state;
    const { showIndicator, hideIndicator, showError, showSuccess, details } = this.props;
    // this.setState({
    //   progress: 0,
    //   loading: true,
    // });
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
        get(details, [indexImage, 'thumb_img_url']),
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
        // this.setState({
        //   progress: 100,
        //   loading: false,
        // });
        this.nextImage();
      })
      .catch(() => {
        hideIndicator();
        showError('Download failed');
        // console.log('e ', e);
      })
    ;
  };

  actualIosDownload = () => {
    const { indexImage } = this.state;
    const { showIndicator, hideIndicator, showError, showSuccess, details } = this.props;
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
        // 'http://149.28.229.28//images_data/10669651.jpg',
        get(details, [indexImage, 'thumb_img_url']),
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
        // this.setState({
        //   progress: 100,
        //   loading: false,
        // });
        this.nextImage();
      })
      .catch(() => {
        hideIndicator();
        showError('Download failed');
        // console.log('e ', e);
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

  setIndexImg = (index) => () => {
    this.setState({
      indexImage: index,
    });
  }



  nextImage = () => {
    this.midComponent._carousel.snapToNext();
    this.setIndexImg(this.state.indexImage + 1)();
  }

  scrollToImage = (index) => () => {
    this.topComponent.flatListRef.scrollToIndex({ animated: true, index: '' + index });
    this.midComponent._carousel.snapToItem(index);
    this.setIndexImg(index)();

  }


  renderLoading = () => {
    return (
      <View style={{ height: 200, justifyContent: 'center' }}>
        <ActivityIndicator
          size='large'
          color='#6D77A7'
          style={{ height: normalizeHeight(70) }}
        />
      </View>
    );
  }

  render() {
    const { details, isDetailsLoadingMore } = this.props;
    return (
      <View flex={1} >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          {details.length > 0 ? <Top data={details} isDetailsLoadingMore={isDetailsLoadingMore}
            loadMoreDetails={this.loadMoreDetails}
            ref={(topComponent) => { this.topComponent = topComponent; }}
            scrollToImage={this.scrollToImage} /> :
            this.renderLoading()}

          {details.length > 0 ? <Mid
            loadMoreDetails={this.loadMoreDetails}
            data={details} setIndexImg={this.setIndexImg}
            ref={(midComponent) => { this.midComponent = midComponent; }}
          /> : <View style={{ flex: 1 }}>
            {this.renderLoading()}
          </View>
          }

          <Bottom
            downloadFile={this.downloadFile}
            nextImage={this.nextImage} />

        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  details: get(state, ['detail', 'details'], []),
  isDetailsRefreshing: get(state, ['detail', 'isDetailsRefreshing']),
  isDetailsLoadingMore: get(state, ['detail', 'isDetailsLoadingMore']),
  detailsHasMore: get(state, ['detail', 'detailsHasMore']),
  detailsPage: get(state, ['detail', 'detailsPage']),
});

const mapDispatchToProps = (dispatch) => ({
  showIndicator: () => dispatch(AppActions.showIndicator()),
  hideIndicator: () => dispatch(AppActions.hideIndicator()),
  showError: (mess) => dispatch(AppActions.showError(mess)),
  showSuccess: (mess) => dispatch(AppActions.showSuccess(mess)),

  getDetailRequest: (params, success, error) => dispatch(DetailActions.getDetailRequest(params, success, error)),
  clearDataDetail: () => dispatch(DetailActions.clearDataDetail()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

