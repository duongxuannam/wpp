import { takeLatest, all, call, put } from 'redux-saga/effects';

import HomeAPI from '../service/HomeApi';
import HomeActions, { HomeTypes } from '../redux/homeRedux';
import AppActions from '../redux/appRedux';
import { convertJSON } from '../util/common';

function* homeSaga() {
  yield all([
    yield takeLatest(HomeTypes.GET_NEWS_REQUEST, getNewsRequest),
    yield takeLatest(HomeTypes.GET_TOP_REQUEST, getTopRequest),

  ]);
}

export function* getNewsRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  try {
    const res = yield call(HomeAPI.getNews, params);
    const news = convertJSON(res);
    const hasMore = news && news.length !== 0;
    yield put(HomeActions.getNewsSuccess(news, hasMore));
    actionSuccess && actionSuccess(news);
  } catch (error) {
    console.log(error);
    yield put(AppActions.showError(error));
    yield put(HomeActions.getNewsFailure());
    actionFailure && actionFailure(error);
  }
}

export function* getTopRequest(actions) {
  const { actionSuccess, actionFailure } = actions;
  try {
    const res = yield call(HomeAPI.getTop);
    const topDownload = convertJSON(res);
    yield put(HomeActions.getTopSuccess(topDownload));
    actionSuccess && actionSuccess(topDownload);
  } catch (error) {
    yield put(AppActions.showError(error));
    yield put(HomeActions.getTopFailure());
    actionFailure && actionFailure(error);
  }
}

export default homeSaga;
