import React from 'react';
import {WebView} from 'react-native-webview';

export default function Sentiment() {
  return <WebView source={{uri: 'http://twitter-embed.herokuapp.com/'}} />;
}
