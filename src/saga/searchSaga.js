import { takeLatest, all, call, put } from 'redux-saga/effects';

import SearchApi from '../service/SearchApi';
import SearchActions, { SearchTypes } from '../redux/searchRedux';
import AppActions from '../redux/appRedux';

function* searchSaga() {
  yield all([
    yield takeLatest(SearchTypes.GET_SEARCH_REQUEST, getSearchRequest),

  ]);
}

export function* getSearchRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  try {
    const searchs = yield call(SearchApi.getSearch, params);
    const hasMore = searchs && searchs.length !== 0;
    yield put(SearchActions.getSearchSuccess(searchs, hasMore));
    actionSuccess && actionSuccess(searchs);
  } catch (error) {
    // console.log(error);
    yield put(AppActions.showError(error));
    yield put(SearchActions.getSearchFailure());
    actionFailure && actionFailure(error);
  }
}


export default searchSaga;
