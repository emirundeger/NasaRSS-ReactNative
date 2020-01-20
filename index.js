/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import languageReducer from './app/reducers/languageReducer';
import {name as appName} from './app.json';

const store = createStore(languageReducer);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
