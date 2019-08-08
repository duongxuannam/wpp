import React, { Component } from 'react';
import {
  View, FlatList, TouchableOpacity, Image, StyleSheet, Text,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, debounce } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchActions from '../../redux/searchRedux';
import Header from './Header';
import { normalizeHeight, normalize, ratioScreen, windowWidth } from '../../util/common';

const widthItem = (windowWidth - normalize(70)) / 2;

class Search extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    clearDataSearch: PropTypes.func,
    searchs: PropTypes.array,
    isSearchLoadingMore: PropTypes.bool,
    isSearchRefreshing: PropTypes.bool,
    searchsHasMore: PropTypes.bool,
    searchsPage: PropTypes.number,
    getSearchRequest: PropTypes.func,
  };


  static navigationOptions = ({ navigation }) => {
    const textSearch = get(navigation, ['state', 'params', 'textSearch'], '');
    const changeTextSearch = get(navigation, ['state', 'params', 'changeTextSearch'], () => { });
    const onSearchHandle = get(navigation, ['state', 'params', 'onSearchHandle'], () => { });
    const resetSearch = get(navigation, ['state', 'params', 'resetSearch'], () => { });

    return {
      headerTitle: (
        <Header
          textSearch={textSearch}
          changeTextSearch={changeTextSearch}
          onSearchHandle={onSearchHandle}
          navigation={navigation}
          resetSearch={resetSearch}
        />
      ),
      headerStyle: {
        backgroundColor: '#6D77A7',
        height: normalizeHeight(60),
        borderBottomWidth: 0,
        elevation: 0,
        // flex: 1,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
    };
    this.debounceSearch = this.debounceSearch.bind(this);
    this.handleDebounceSearch = debounce((value) => this.debounceSearch(value), 1000);
    this.changeTextSearch = this.changeTextSearch.bind(this);
  }


  debounceSearch(search) {
    const { getSearchRequest, isSearchRefreshing, isSearchLoadingMore } = this.props;
    if (isSearchRefreshing || isSearchLoadingMore) return;
    if (search && search.trim() !== '') {
      const params = {
        func: 'query',
        device: 'iphone',
        page: 1,
        name: search,
      };
      getSearchRequest(params);


    }
  }

  changeTextSearch(textSearch) {
    let { navigation } = this.props;
    let { setParams } = navigation;
    setParams({ textSearch, changeTextSearch: this.changeTextSearch });
    this.setState({ textSearch });
    this.handleDebounceSearch(textSearch);
  }

  componentDidMount() {
    const { textSearch } = this.state;
    const { navigation } = this.props;
    const { setParams } = navigation;
    setParams({ textSearch, changeTextSearch: this.changeTextSearch, resetSearch: this.resetSearch });
  }

  componentWillUnmount() {
    const { clearDataSearch } = this.props;
    clearDataSearch();
  }

  resetSearch = () => {
    const { clearDataSearch, navigation } = this.props;
    const { setParams } = navigation;

    clearDataSearch();
    this.setState({ textSearch: '' });
    setParams({ textSearch: '' });

  }


  renderItem = ({ item, index }) => {
    const { textSearch } = this.state;
    const { navigation } = this.props;
    const params = {
      func: 'query',
      device: 'iphone',
      page: 1,
      name: textSearch,
    };
    const styleIndex = index % 2 === 0 ? { marginRight: normalize(20) } : { marginLeft: normalize(20) };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailNavigation', { params, title: textSearch })}
      >
        <View key={index} style={[{
          height: (widthItem * ratioScreen),
          width: widthItem,
          marginVertical: 20,
          alignItems: 'center',
        }, styleIndex]}>

          <View
            style={{
              height: (widthItem * ratioScreen),
              width: widthItem,
            }}
            key={index}>
            <Image
              source={{ uri: item.thumb_img_url }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: 'cover', margin: 1, backgroundColor: '#D0CDCE',
              }}
            />
          </View>

          <View style={{
            position: 'absolute', bottom: 0, right: 0, left: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            height: normalize(75),
            justifyContent: 'center',
          }}>
            <Text style={{
              fontWeight: '600', color: 'white',
              fontSize: normalize(14),
              textAlign: 'center',
            }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontWeight: '600', color: 'white',
                fontSize: normalize(13), marginTop: 4,
                textAlign: 'center',
              }}
            >
              Download {item.downloads}
            </Text>
          </View>
        </View >
      </TouchableOpacity>
    );
  }

  renderEmpty = () => (
    <View style={{
      alignItems: 'center',
      marginTop: 30,
    }}>
      <Icon name='ios-image' style={[{
        color: 'white',
        backgroundColor: 'transparent',
        paddingHorizontal: 5,
        marginHorizontal: 8,
        paddingVertical: 5,
      }]} size={30} />
      <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>
        Data Empty
      </Text>
    </View>
  )



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

  loadMoreDetails = () => {
    const {
      searchsPage,
      searchsHasMore,
      isSearchLoadingMore,
      isSearchRefreshing,
      getSearchRequest,
    } = this.props;
    const { textSearch } = this.state;
    const params = {
      func: 'query',
      device: 'iphone',
      page: searchsPage + 1,
      name: textSearch,
    };

    if (!isSearchLoadingMore && !isSearchRefreshing && searchsHasMore && textSearch.length > 0) {
      getSearchRequest(params);
    }
  }
  renderFooter = () => {
    const { isSearchLoadingMore } = this.props;
    if (isSearchLoadingMore) {
      return (
        <View style={{
          alignItems: 'center',
          marginTop: 30,
        }}>
          <ActivityIndicator
            size='large'
            color='#6D77A7'
            style={{ height: normalizeHeight(70) }}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { searchs, isSearchRefreshing } = this.props;
    return (
      <View flex={1} >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
          locations={[0, 0.2, 0.3, 0.4]}
          colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
          style={{ flex: 1 }}>
          {
            isSearchRefreshing ? this.renderLoading() :
              <FlatList
                data={searchs}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmpty}
                style={{ marginHorizontal: normalize(15) }}
                showsVerticalScrollIndicator={false}

                onEndReached={this.loadMoreDetails}
                onEndReachedThreshold={0.2}
                ListFooterComponent={this.renderFooter}
              />}
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  searchs: get(state, ['search', 'searchs'], []),
  isSearchRefreshing: get(state, ['search', 'isSearchRefreshing']),
  isSearchLoadingMore: get(state, ['search', 'isSearchLoadingMore']),
  searchsHasMore: get(state, ['search', 'searchsHasMore']),
  searchsPage: get(state, ['search', 'searchsPage']),
});

const mapDispatchToProps = (dispatch) => ({
  getSearchRequest: (params, success, error) => dispatch(SearchActions.getSearchRequest(params, success, error)),
  clearDataSearch: () => dispatch(SearchActions.clearDataSearch()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

