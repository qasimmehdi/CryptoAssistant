import 'node-libs-react-native/globals';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import Reducer from './src/store';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {http} from 'stream-http';
global.http = http;

const store = createStore(Reducer);

axios.defaults.baseURL =
  'http://ec2-13-58-153-32.us-east-2.compute.amazonaws.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const CryptoAssistant = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => CryptoAssistant);
