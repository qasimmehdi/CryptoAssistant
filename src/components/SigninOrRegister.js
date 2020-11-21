/* eslint-disable react-native/no-inline-styles */
import {Button, Text, theme} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {loginStyles} from '../styles/loginStyles';
import {COLOR} from './shared/colors';

function SigninOrRegister({navigation}) {
  return (

    <View style={loginStyles.body}>
      <View style={loginStyles.title}>
        <Text h3 color={theme.COLORS.WHITE} bold>
          Crypto Assistant
        </Text>
      </View>
      <View style={loginStyles.SigninOrRegisterButton}>
        <Button
          round
          color="transparent"
          style={{borderColor: COLOR.APP_GREY, marginBottom: 20}}
          onPress={() => navigation.navigate('Sign In')}>
          <Text color={COLOR.WHITE} h5 bold>
            Sign In
          </Text>
        </Button>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={{...loginStyles.linearGradient, marginBottom: 20}}>
          <Button
            round
            color="transparent"
            style={loginStyles.borderless}
            onPress={() => navigation.navigate('EnterUsername')}>
            <Text color={COLOR.WHITE} h5 bold>
              Register
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>

  );
}

export default SigninOrRegister;
