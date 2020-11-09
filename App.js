/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import FCM from './src/services/FCM';
import StackNav from './src/navigation/StackNav';
import {dbSetup, getTables} from './src/db/methods';
import {useDispatch} from 'react-redux';
import * as Actions from './src/store/actions';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

dbSetup();

const App = () => {
  const dispatch = useDispatch();

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
    async function FcmFetch() {
      let fcmToken = await fcm.checkPermission();
      if (fcmToken) {
        console.log('FCM', fcmToken);
        dispatch(Actions.fcmToken({token: fcmToken}));
      }
      fcm.messageListener();
    }
    FcmFetch();
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
