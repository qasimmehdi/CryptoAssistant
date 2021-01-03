/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions} from '@react-navigation/native';
import {Button, Input, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {forgetGetCode, ModifyPassword} from '../services/auth';
import {loginStyles} from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import {COLOR} from './shared/colors';
import CustomInput from './shared/NewCustomInput';
import {regexes} from './shared/regexes';
import Loading from './SplashScreen';

function ForgetEnterEmail({navigation}) {
  const [email, setEmail] = useState('');
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [disableSigin, setDisableSignin] = useState(true);
  const [userV, setUserV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userV) {
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [userV]);

  return (
    <View style={registerStyles.body}>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <View style={registerStyles.inputContainer}>
            <CustomInput
              style={loginStyles.input}
              type="email-address"
              placeholder="Email address"
              placeholderTextColor={COLOR.APP_GREY}
              value={email}
              onChangeText={setEmail}
              validations={[
                {
                  regex: regexes.required,
                  errMsg: 'Required',
                },
                {
                  regex: regexes.email,
                  errMsg: 'Invalid email address',
                },
              ]}
              onValidation={isValid => setUserV(isValid)}
              color={COLOR.WHITE}
            />
          </View>
          <View style={registerStyles.NextButton}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={gradientColors}
              style={loginStyles.linearGradient}>
              <Button
                round
                color="transparent"
                style={loginStyles.borderless}
                disabled={disableSigin}
                onPress={() => {
                  setIsLoading(true);
                  forgetGetCode(email)
                    .then(res => {
                      console.log(res);
                      Alert.alert('Code Sent Successfully');
                      navigation.navigate('ResetPassword');
                    })
                    .catch(err => {
                      Alert.alert(
                        err?.response?.data?.errorMsg ?? 'Something went wrong',
                      );
                    })
                    .finally(() => setIsLoading(false));
                }}>
                <Text color={COLOR.WHITE} h5 bold>
                  Get Code
                </Text>
              </Button>
            </LinearGradient>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

function ResetPassword({navigation}) {
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [disableSigin, setDisableSignin] = useState(true);
  const [passV, setPassV] = useState(false);
  const [pass2V, setPass2V] = useState(false);
  const [codeV, setCodeV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchError, setMatchError] = useState(false);

  useEffect(() => {
    if (pass2V && passV && codeV) {
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [pass2V, passV, codeV]);

  useEffect(() => {
    if (pass.length > 0 && pass2.length > 0 && pass === pass2) {
      setMatchError(false);
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else if (pass.length > 0 && pass2.length > 0) {
      setMatchError(true);
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [pass, pass2]);

  return (
    <View style={registerStyles.body}>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <View style={registerStyles.inputContainer}>
            <CustomInput
              style={loginStyles.input}
              placeholder="Code"
              placeholderTextColor={COLOR.APP_GREY}
              type="number-pad"
              color={COLOR.WHITE}
              value={code}
              onChangeText={setCode}
              validations={[
                {
                  regex: regexes.otp,
                  errMsg: 'Min 6 characters are required',
                },
              ]}
              onValidation={isValid => setCodeV(isValid)}
            />
            <CustomInput
              style={loginStyles.input}
              placeholder="Password"
              placeholderTextColor={COLOR.APP_GREY}
              password
              viewPass
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={pass}
              onChangeText={setPass}
              validations={[
                {
                  regex: regexes.required,
                  errMsg: 'Required',
                },
                {
                  regex: regexes.password,
                  errMsg: 'Min 8 characters are required',
                },
              ]}
              onValidation={isValid => setPassV(isValid)}
            />
            <CustomInput
              style={loginStyles.input}
              placeholder="Re-enter password"
              placeholderTextColor={COLOR.APP_GREY}
              password
              viewPass
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={pass2}
              onChangeText={setPass2}
              validations={[
                {
                  regex: regexes.required,
                  errMsg: 'Required',
                },
                {
                  regex: regexes.password,
                  errMsg: 'Min 8 characters are required',
                },
              ]}
              onValidation={isValid => setPass2V(isValid)}
            />
            {matchError ? (
              <Text size={10} color={COLOR.RED}>
                Passwords donot match
              </Text>
            ) : null}
          </View>
          <View style={registerStyles.NextButton}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={gradientColors}
              style={loginStyles.linearGradient}>
              <Button
                round
                color="transparent"
                style={loginStyles.borderless}
                disabled={disableSigin}
                onPress={async () => {
                  setIsLoading(true);
                  if (await ModifyPassword(code, pass2)) {
                    Alert.alert('Password Reset Successfully');
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: 'SigninOrRegister'}, {name: 'Sign In'}],
                      }),
                    );
                  } else {
                    Alert.alert('Something went wrong');
                  }
                  setIsLoading(false);
                }}>
                <Text color={COLOR.WHITE} h5 bold>
                  Save
                </Text>
              </Button>
            </LinearGradient>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

export {ForgetEnterEmail, ResetPassword};
