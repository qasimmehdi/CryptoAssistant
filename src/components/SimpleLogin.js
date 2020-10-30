import { useIsFocused } from "@react-navigation/native";
import { Button, Text } from 'galio-framework';
import CustomInput from './shared/custom-input';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableHighlight, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { loginUser } from '../services/auth';
import { loginStyles } from '../styles/loginStyles';
import Loading from './SplashScreen';
import { CommonActions } from "@react-navigation/native";
import { COLOR } from "./shared/colors";

function LoginForm({ navigation }) {
  const [user, onChangeUser] = useState('');
  const [pass, onChangePass] = useState('');
  const [progress, onChangeProgress] = useState(false);
  const isFocused = useIsFocused();
  const [validUser, setValidUser] = useState('false');
  const [validPass, setValidPass] = useState('false');
  const [disableSigin, setDisableSignin] = useState(true);
  const [gradientColors, setGradientColors] = useState([COLOR.DISABLED, COLOR.DISABLED]);

  useEffect(() => {
    if(validPass == 'true' && validUser == 'true'){
      console.log('valid');
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    }
    else{
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [validUser, validPass]);

  return (
    <View style={loginStyles.body}>
      {
        progress ? <Loading /> :
          <>
            <View style={loginStyles.centerForm}>
              <View style={loginStyles.sectionContainer}>
                <CustomInput
                  style={loginStyles.input}
                  type='email-address'
                  placeholder="Email address or username"
                  placeholderTextColor="#808080"
                  value={user}
                  onChangeText={onChangeUser}
                  pattern={[
                    /^(([\w]{6,20})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))))$/, // email or username
                  ]}
                  onValidation={isValid => {
                    setValidUser(isValid.toString());
                  }}
                  color='#fff'
                />
                <CustomInput
                  style={loginStyles.input}
                  placeholder="Password"
                  placeholderTextColor="#808080"
                  password
                  viewPass
                  iconColor='#808080'
                  color='#fff'
                  value={pass}
                  onChangeText={onChangePass}
                  pattern={[
                    '^.{8,}$', // min 8 chars
                  ]}
                  onValidation={isValid => {
                    setValidPass(isValid.toString());
                  }}
                />
              </View>
              <TouchableHighlight style={loginStyles.forgotPassword} onPress={() => navigation.navigate('ForgetEnterEmail')}>
                <Text color={'#808080'} size={11} bold>
                  Forgot Password?
                </Text>
              </TouchableHighlight>

            </View>
            <View style={loginStyles.button}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={gradientColors} style={loginStyles.linearGradient}>
                <Button round color='transparent' style={loginStyles.borderless}
                  disabled={disableSigin}
                  onPress={(async () => {
                    onChangeProgress(true);
                    if (await loginUser(user, pass)) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: "Dashboard" }],
                        })
                      );
                    } else {
                      onChangeProgress(false);
                      Alert.alert("Login Unsuccessful");
                    }
                  })}
                >
                  <Text color={COLOR.WHITE} h5 bold>Sign In</Text>
                </Button>
              </LinearGradient>
            </View>
          </>
      }
    </View>

  );
}

export default LoginForm;