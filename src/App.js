import React, { Component } from 'react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import './config';
import DebugConfig from './config/DebugConfig';
import RootContainer from './container/Root';
import createStore from './redux';
// create our store
const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
        <FlashMessage
          position="top"
          //hideStatusBar
          icon={{
            icon: 'warning',
            position: 'left',
          }}
        />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App) // eslint-disable-line
  : App;
