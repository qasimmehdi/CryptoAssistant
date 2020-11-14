/* eslint-disable react-native/no-inline-styles */
import {CommonActions} from '@react-navigation/native';
import {Button, Text, theme} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {loginStyles} from '../styles/loginStyles';
import {COLOR} from './shared/colors';

function AccountCreated({navigation}) {
  return (

    <View style={loginStyles.body}>
      <View
        style={{
          ...loginStyles.title,
          alignSelf: 'flex-start',
          marginLeft: 15,
          marginRight: 15,
        }}>
        <Text h3 color={theme.COLORS.WHITE} bold style={{marginBottom: 10}}>
          Account Created
        </Text>
      </View>
      <View style={loginStyles.SigninOrRegisterButton}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={{...loginStyles.linearGradient, marginBottom: 20}}>
          <Button
            round
            color="transparent"
            style={loginStyles.borderless}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'SigninOrRegister'}, {name: 'Sign In'}],
                }),
              );
            }}>
            <Text color={COLOR.WHITE} h5 bold>
              Sign In
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>

  );
}

export default AccountCreated;
