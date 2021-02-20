import React from 'react';
import {WebView} from 'react-native-webview';

export default function Sentiment() {
  return <WebView source={{uri: 'http://10.0.2.2:3000/'}} />;
}
