import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSearchRequest: ['params', 'actionSuccess', 'actionFailure'],
  getSearchSuccess: ['searchs', 'hasMore'],
  getSearchFailure: ['error'],
  clearDataSearch: null,
});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  searchs: [],
  isSearchRefreshing: false,
  isSearchLoadingMore: false,
  searchsHasMore: true,
  searchsPage: 1,

  name: '',

});

/* ------------- Reducers ------------- */
export const getSearchRequest = (state, { params }) => {
  const { page, name } = params;
  if (page === 1) {
    return state.merge({
      ...state,
      isSearchRefreshing: true,
      searchsPage: 1,
      name,
    });
  }
  else return state.merge({
    ...state,
    isSearchLoadingMore: true,
    searchsPage: page,
    name,
  });
};


export const getSearchSuccess = (state, { searchs, hasMore }) => {
  const { isSearchLoadingMore } = state;
  if (isSearchLoadingMore) {
    let dataHandle = state.searchs.concat(searchs);
    return state.merge({
      ...state,
      searchs: dataHandle,
      isSearchLoadingMore: false,
      isSearchRefreshing: false,
      searchsHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    searchs,
    isSearchLoadingMore: false,
    isSearchRefreshing: false,
    searchsHasMore: hasMore,
  });
};

export const getSearchFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isSearchLoadingMore: false,
    isSearchRefreshing: false,
  });
};

export const clearDataSearch = () => INITIAL_STATE;



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SEARCH_REQUEST]: getSearchRequest,
  [Types.GET_SEARCH_SUCCESS]: getSearchSuccess,
  [Types.GET_SEARCH_FAILURE]: getSearchFailure,

  [Types.CLEAR_DATA_SEARCH]: clearDataSearch,
});
