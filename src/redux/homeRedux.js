import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNewsRequest: ['params', 'actionSuccess', 'actionFailure'],
  getNewsSuccess: ['news', 'hasMore'],
  getNewsFailure: ['error'],

  getCategoriesRequest: ['params', 'actionSuccess', 'actionFailure'],
  getCategoriesSuccess: ['categories', 'hasMore'],
  getCategoriesFailure: ['error'],

  getTopRequest: ['params', 'actionSuccess', 'actionFailure'],
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
  newsPage: 1,

  categories: [],
  isCategoriesRefreshing: false,
  isCategoriesLoadingMore: false,
  categoriesHasMore: true,
  categoriesPage: 1,

  topDownload: [],
  isTopDownloadRefreshing: false,
  isTopDownloadLoadingMore: false,
  topDownloadHasMore: true,
  topDownloadPage: 1,
});

/* ------------- Reducers ------------- */
export const getNewsRequest = (state, { params }) => {
  const { page } = params;
  if (page === 1) {
    return state.merge({
      ...state,
      isNewsRefreshing: true,
      newsPage: 1,
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

export const getCategoriesRequest = (state, { params }) => {
  const { page } = params;
  if (page === 1) {
    return state.merge({
      ...state,
      isCategoriesRefreshing: true,
      categoriesPage: 1,
    });
  }
  else return state.merge({
    ...state,
    isCategoriesLoadingMore: true,
    categoriesPage: page,
  });
};

export const getCategoriesSuccess = (state, { categories, hasMore }) => {
  const { isCategoriesLoadingMore } = state;
  if (isCategoriesLoadingMore) {
    let dataHandle = state.categories.concat(categories);
    return state.merge({
      ...state,
      categories: dataHandle,
      isCategoriesLoadingMore: false,
      isCategoriesRefreshing: false,
      categoriesHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    categories,
    isCategoriesLoadingMore: false,
    isCategoriesRefreshing: false,
    categoriesHasMore: hasMore,
  });
};

export const getCategoriesFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isCategoriesLoadingMore: false,
    isCategoriesRefreshing: false,
  });
};


export const getTopRequest = (state, { params }) => {
  const { page } = params;
  if (page === 1) {
    return state.merge({
      ...state,
      isTopDownloadRefreshing: true,
      topDownloadPage: 1,
    });
  }
  else return state.merge({
    ...state,
    isTopDownloadLoadingMore: true,
    topDownloadPage: page,
  });
};



export const getTopSuccess = (state, { topDownload, hasMore }) => {
  const { isTopDownloadLoadingMore } = state;
  if (isTopDownloadLoadingMore) {
    let dataHandle = state.topDownload.concat(topDownload);
    return state.merge({
      ...state,
      topDownload: dataHandle,
      isTopDownloadLoadingMore: false,
      isTopDownloadRefreshing: false,
      topDownloadHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    topDownload,
    isTopDownloadLoadingMore: false,
    isTopDownloadRefreshing: false,
    topDownloadHasMore: hasMore,
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

  [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,

  [Types.GET_TOP_REQUEST]: getTopRequest,
  [Types.GET_TOP_SUCCESS]: getTopSuccess,
  [Types.GET_TOP_FAILURE]: getTopFailure,
});
