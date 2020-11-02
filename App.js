/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import FCM from './src/services/FCM';
import StackNav from './src/navigation/StackNav';
import {DbSetup, GetTables} from './src/db/methods';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
DbSetup();
GetTables();

const App = () => {
  //var initialRoute;

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  const fcm = new FCM(showAlert);

  useEffect(() => {
    fcm.checkPermission();
    fcm.messageListener();
  }, []);

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;

//app start command
//gnome-terminal -e "react-native start" & react-native run-android
