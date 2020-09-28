import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './src/redux';

axios.defaults.baseURL = "https://blooming-atoll-97481.herokuapp.com";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const CryptoAssistant = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => CryptoAssistant);
