import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNewsRequest: ['params', 'actionSuccess', 'actionFailure'],
  getNewsSuccess: ['news', 'hasMore'],
  getNewsFailure: ['error'],

  getTopRequest: ['actionSuccess', 'actionFailure'],
  getTopSuccess: ['topDownload', 'hasMore'],
  getTopFailure: ['error'],

});

export const HomeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  news: [],
  isNewsRefreshing: false,
  isNewsLoadingMore: false,
  newsHasMore: true,
  newsPage: 0,

  topDownload: [],
  isTopDownloadLoading: false,
});

/* ------------- Reducers ------------- */
export const getNewsRequest = (state, { params }) => {
  const { page } = params;
  if (page === 0) {
    return state.merge({
      ...state,
      isNewsRefreshing: true,
      newsPage: 0,
    });
  }
  else return state.merge({
    ...state,
    isNewsLoadingMore: true,
    newsPage: page,
  });
};


export const getNewsSuccess = (state, { news, hasMore }) => {
  const { isNewsLoadingMore } = state;
  if (isNewsLoadingMore) {
    let dataHandle = state.news.concat(news);
    return state.merge({
      ...state,
      news: dataHandle,
      isNewsLoadingMore: false,
      isNewsRefreshing: false,
      newsHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    news,
    isNewsLoadingMore: false,
    isNewsRefreshing: false,
    newsHasMore: hasMore,
  });
};

export const getNewsFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isNewsLoadingMore: false,
    isNewsRefreshing: false,
  });
};


export const getTopRequest = (state) => {
  return state.merge({
    ...state,
    isTopDownloadLoading: true,
  });
};


export const getTopSuccess = (state, { topDownload }) => {
  return state.merge({
    ...state,
    topDownload,
    isTopDownloadLoading: false,
  });
};

export const getTopFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isTopDownloadLoading: false,
  });
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NEWS_REQUEST]: getNewsRequest,
  [Types.GET_NEWS_SUCCESS]: getNewsSuccess,
  [Types.GET_NEWS_FAILURE]: getNewsFailure,

  [Types.GET_TOP_REQUEST]: getTopRequest,
  [Types.GET_TOP_SUCCESS]: getTopSuccess,
  [Types.GET_TOP_FAILURE]: getTopFailure,
});
