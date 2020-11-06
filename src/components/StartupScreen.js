/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SInfoGet} from '../services/sensitiveStorage';
import {loginStyles} from '../styles/loginStyles';
import Loading from './SplashScreen';
import * as Actions from '../store/actions';

const StartupScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    SInfoGet('auth_token')
      .then(resp => {
        console.log('token', resp);
        if (resp != null) {
          dispatch(Actions.token({token: resp}));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SigninOrRegister'}],
            }),
          );
        }
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={loginStyles.body}>
      <Loading />
    </View>
  );
};
export default StartupScreen;
