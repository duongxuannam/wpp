import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { showMessage } from 'react-native-flash-message';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startupRequest: null,
  startupSuccess: null,

  showIndicator: null,
  hideIndicator: null,

  showErrorRequest: ['error'],

  showError: ['errorMessage'],
  showSuccess: ['message'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  language: 'vi',
  isReady: false,
  isShowingIndicator: false,
});

/* ------------- Reducers ------------- */
export const changeLanguage = (state, { language }) => state.merge({ language });

export const startupRequest = (state) => {
  return state.merge({ isReady: false });
};

export const startupSuccess = (state) => {
  return state.merge({ isReady: true });
};

// handler show indicator
export const showIndicator = (state) => {
  return state.merge({ isShowingIndicator: true });
};

// handler hide indicator
export const hideIndicator = (state) => {
  return state.merge({ isShowingIndicator: false });
};

// Handle show error
const showError = (state, { errorMessage }) => {
  showMessage({
    message: 'Error',
    description: errorMessage,
    type: 'danger',
  });
  return state.merge({});
};

// Handle show Success
const showSuccess = (state, { message }) => {
  showMessage({
    message: 'Success',
    description: message,
    type: 'success',
  });
  return state.merge({});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP_REQUEST]: startupRequest,
  [Types.STARTUP_SUCCESS]: startupSuccess,

  [Types.SHOW_INDICATOR]: showIndicator,
  [Types.HIDE_INDICATOR]: hideIndicator,

  [Types.SHOW_ERROR]: showError,
  [Types.SHOW_SUCCESS]: showSuccess,
});
