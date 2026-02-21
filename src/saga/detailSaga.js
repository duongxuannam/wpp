import { takeLatest, all, call, put } from 'redux-saga/effects';

import DetailApi from '../service/DetailApi';
import DetailActions, { DetailTypes } from '../redux/detailRedux';
import AppActions from '../redux/appRedux';

function* detailSaga() {
  yield all([
    yield takeLatest(DetailTypes.GET_DETAIL_REQUEST, getDetailRequest),

  ]);
}

export function* getDetailRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  try {
    const details = yield call(DetailApi.getDetail, params);
    const hasMore = details && details.length !== 0;
    yield put(DetailActions.getDetailSuccess(details, hasMore));
    actionSuccess && actionSuccess(details);
  } catch (error) {
    // console.log(error);
    yield put(AppActions.showError(error));
    yield put(DetailActions.getDetailFailure());
    actionFailure && actionFailure(error);
  }
}


export default detailSaga;
