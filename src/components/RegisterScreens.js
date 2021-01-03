/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {Button, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../services/auth';
import * as Actions from '../store/actions';
import {loginStyles} from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import {COLOR} from './shared/colors';
import CustomInput from './shared/NewCustomInput';
import {regexes} from './shared/regexes';
import Loading from './SplashScreen';

function EnterUsername({navigation}) {
  const isFocused = useIsFocused();
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [disableSigin, setDisableSignin] = useState(true);
  const user = useSelector(state => state.EditUsername.username);
  const dispatch = useDispatch();
  const onChangeUser = text => {
    return dispatch(Actions.EditUsername({username: text}));
  };

  const [userV, setUserV] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (userV) {
        setDisableSignin(false);
        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
      } else {
        setDisableSignin(true);
        setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
      }
    }
  }, [userV]);

  useEffect(() => {
    if (isFocused && regexes.user.test(user)) {
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [isFocused]);

  return (
    <View style={registerStyles.body}>
      <View style={registerStyles.inputContainer}>
        <CustomInput
          style={loginStyles.input}
          placeholder="Username"
          placeholderTextColor={COLOR.APP_GREY}
          color={COLOR.WHITE}
          value={user}
          onChangeText={text => onChangeUser(text)}
          validations={[
            {
              regex: regexes.user,
              errMsg: 'Min 6 characters are required',
            },
          ]}
          onValidation={isValid => setUserV(isValid)}
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
            onPress={() => navigation.navigate('EnterPassword')}
            disabled={disableSigin}>
            <Text color={COLOR.WHITE} h5 bold>
              Next
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}

function EnterPassword({navigation}) {
  const isFocused = useIsFocused();
  const [disableNext, setDisableNext] = useState(true);
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const pass = useSelector(state => state.EditPassword.password);
  const dispatch = useDispatch();
  const onChangePass = text => {
    return dispatch(Actions.EditPassword({password: text}));
  };
  const [passV, setPassV] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (passV) {
        setDisableNext(false);
        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
      } else {
        setDisableNext(true);
        setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
      }
    }
  }, [passV]);

  useEffect(() => {
    if (isFocused && regexes.password.test(pass)) {
      setDisableNext(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableNext(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [isFocused]);

  return (
    <View style={registerStyles.body}>
      <View style={registerStyles.inputContainer}>
        <CustomInput
          style={loginStyles.input}
          password
          viewPass
          placeholder="Password"
          placeholderTextColor={COLOR.APP_GREY}
          iconColor={COLOR.APP_GREY}
          color={COLOR.WHITE}
          value={pass}
          onChangeText={text => onChangePass(text)}
          validations={[
            {
              regex: regexes.password,
              errMsg: 'Min 8 characters are required',
            },
          ]}
          onValidation={isValid => setPassV(isValid)}
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
            onPress={() => navigation.navigate('EnterEmail')}
            disabled={disableNext}>
            <Text color={COLOR.WHITE} h5 bold>
              Next
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}

function EnterEmail({navigation}) {
  const isFocused = useIsFocused();
  const [disableNext, setDisableNext] = useState(true);
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector(state => state.EditEmail.email);
  // eslint-disable-next-line no-shadow
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const onChangeEmail = text => {
    return dispatch(Actions.EditEmail({email: text}));
  };
  const [emailV, setEmailV] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (emailV) {
        setDisableNext(false);
        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
      } else {
        setDisableNext(true);
        setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
      }
    }
  }, [emailV]);

  useEffect(() => {
    if (isFocused && regexes.email.test(email)) {
      setDisableNext(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableNext(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [isFocused]);

  return (
    <View style={registerStyles.body}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={registerStyles.inputContainer}>
            <CustomInput
              style={loginStyles.input}
              type="email-address"
              placeholder="Email address"
              placeholderTextColor={COLOR.APP_GREY}
              value={email}
              onChangeText={onChangeEmail}
              validations={[
                {
                  regex: regexes.email,
                  errMsg: 'Invalid email address',
                },
              ]}
              onValidation={isValid => setEmailV(isValid)}
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
                onPress={async () => {
                  setIsLoading(true);
                  if (
                    await registerUser(
                      state.EditUsername.username,
                      state.EditPassword.password,
                      state.EditEmail.email,
                    )
                  ) {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          {name: 'SigninOrRegister'},
                          {name: 'AccountCreated'},
                        ],
                      }),
                    );
                  } else {
                    Alert.alert('Something Went Wrong');
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'SigninOrRegister'}],
                      }),
                    );
                  }
                  setIsLoading(false);
                }}
                disabled={disableNext}>
                <Text color={COLOR.WHITE} h5 bold>
                  Next
                </Text>
              </Button>
            </LinearGradient>
          </View>
        </>
      )}
    </View>
  );
}

export {EnterUsername, EnterPassword, EnterEmail};
