import {CommonActions} from '@react-navigation/native';
import {Button, Input, Text} from 'galio-framework';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {forgetGetCode, ModifyPassword} from '../services/auth';
import {loginStyles} from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import {COLOR} from './shared/colors';

function ForgetEnterEmail({navigation}) {
  const [email, setEmail] = useState('');

  return (
    <View style={registerStyles.body}>
      <View style={registerStyles.inputContainer}>
        <Input
          style={loginStyles.input}
          type="email-address"
          placeholder="Email address"
          placeholderTextColor={COLOR.APP_GREY}
          value={email}
          onChangeText={setEmail}
          color={COLOR.WHITE}
        />
      </View>
      <View style={registerStyles.NextButton}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={loginStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={loginStyles.borderless}
            onPress={async () => {
              if (await forgetGetCode(email)) {
                Alert.alert('Code Sent Successfully');
                navigation.navigate('ResetPassword');
              } else {
                Alert.alert('Something went wrong');
              }
            }}>
            <Text color={COLOR.WHITE} h5 bold>
              Get Code
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}

function ResetPassword({navigation}) {
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  return (
    <View style={registerStyles.body}>
      <View style={registerStyles.inputContainer}>
        <Input
          style={loginStyles.input}
          type="number-pad"
          placeholder="Code"
          placeholderTextColor={COLOR.APP_GREY}
          value={code}
          onChangeText={setCode}
          color={COLOR.WHITE}
        />
        <Input
          style={loginStyles.input}
          password
          viewPass
          placeholder="Password"
          placeholderTextColor={COLOR.APP_GREY}
          value={pass}
          onChangeText={setPass}
          color={COLOR.WHITE}
        />
        <Input
          style={loginStyles.input}
          password
          viewPass
          placeholder="Re-enter Password"
          placeholderTextColor={COLOR.APP_GREY}
          value={pass2}
          onChangeText={setPass2}
          color={COLOR.WHITE}
        />
      </View>
      <View style={registerStyles.NextButton}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={loginStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={loginStyles.borderless}
            onPress={async () => {
              if (await ModifyPassword(code, pass2)) {
                Alert.alert('Password Reset Successfully');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Sign In'}],
                  }),
                );
              } else {
                Alert.alert('Something went wrong');
              }
            }}>
            <Text color={COLOR.WHITE} h5 bold>
              Save
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}

export {ForgetEnterEmail, ResetPassword};
