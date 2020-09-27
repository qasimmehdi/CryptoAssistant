/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

axios.defaults.baseURL = "https://blooming-atoll-97481.herokuapp.com";
axios.defaults.headers.post['Content-Type'] = 'application/json';

AppRegistry.registerComponent(appName, () => App);
