import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDetailRequest: ['params', 'actionSuccess', 'actionFailure'],
  getDetailSuccess: ['details', 'hasMore'],
  getDetailFailure: ['error'],

  clearDataDetail: null,

});

export const DetailTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  details: [],
  isDetailsRefreshing: false,
  isDetailsLoadingMore: false,
  detailsHasMore: true,
  detailsPage: 1,
});

/* ------------- Reducers ------------- */
export const getDetailRequest = (state, { params }) => {
  const { page } = params;
  if (page === 1) {
    return state.merge({
      ...state,
      isDetailsRefreshing: true,
      detailsPage: 1,
    });
  }
  else return state.merge({
    ...state,
    isDetailsLoadingMore: true,
    detailsPage: page,
  });
};


export const getDetailSuccess = (state, { details, hasMore }) => {
  const { isDetailsLoadingMore } = state;
  if (isDetailsLoadingMore) {
    let dataHandle = state.details.concat(details);
    return state.merge({
      ...state,
      details: dataHandle,
      isDetailsLoadingMore: false,
      isDetailsRefreshing: false,
      detailsHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    details,
    isDetailsLoadingMore: false,
    isDetailsRefreshing: false,
    detailsHasMore: hasMore,
  });

};


export const getDetailFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isDetailsLoadingMore: false,
  });
};

export const clearDataDetail = () => INITIAL_STATE;



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DETAIL_REQUEST]: getDetailRequest,
  [Types.GET_DETAIL_SUCCESS]: getDetailSuccess,
  [Types.GET_DETAIL_FAILURE]: getDetailFailure,

  [Types.CLEAR_DATA_DETAIL]: clearDataDetail,
});
