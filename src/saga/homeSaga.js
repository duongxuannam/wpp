import { takeLatest, all, call, put } from 'redux-saga/effects';

import HomeAPI from '../service/HomeApi';
import HomeActions, { HomeTypes } from '../redux/homeRedux';
import AppActions from '../redux/appRedux';

function* homeSaga() {
  yield all([
    yield takeLatest(HomeTypes.GET_NEWS_REQUEST, getNewsRequest),
    yield takeLatest(HomeTypes.GET_CATEGORIES_REQUEST, getCategoriesRequest),
    yield takeLatest(HomeTypes.GET_TOP_REQUEST, getTopRequest),

  ]);
}

export function* getNewsRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  try {
    const news = yield call(HomeAPI.getNews, params);
    const hasMore = news && news.length !== 0;
    yield put(HomeActions.getNewsSuccess(news, hasMore));
    actionSuccess && actionSuccess(news);
  } catch (error) {
    // console.log(error);
    yield put(AppActions.showError(error.toString()));
    yield put(HomeActions.getNewsFailure());
    actionFailure && actionFailure(error);
  }
}

export function* getCategoriesRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  try {
    const categories = yield call(HomeAPI.getCategories, params);
    const hasMore = categories && categories.length !== 0;
    yield put(HomeActions.getCategoriesSuccess(categories, hasMore));
    actionSuccess && actionSuccess(categories);
  } catch (error) {
    // console.log(error);
    yield put(AppActions.showError(error.toString()));
    yield put(HomeActions.getCategoriesFailure());
    actionFailure && actionFailure(error);
  }
}

export function* getTopRequest(actions) {
  const { actionSuccess, actionFailure, params } = actions;
  try {
    const topDownload = yield call(HomeAPI.getTop, params);
    const hasMore = topDownload && topDownload.length !== 0;
    yield put(HomeActions.getTopSuccess(topDownload, hasMore));
    actionSuccess && actionSuccess(topDownload);
  } catch (error) {
    yield put(AppActions.showError(error.toString()));
    yield put(HomeActions.getTopFailure());
    actionFailure && actionFailure(error);
  }
}

export default homeSaga;
