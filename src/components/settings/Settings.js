import {CommonActions} from '@react-navigation/native';
import {Button, Text} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SDeleteInfo} from '../../services/sensitiveStorage';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {settingsStyle} from './Settings.style';

function Logout() {
  return new Promise((resolve, reject) => {
    SDeleteInfo('auth_token')
      .then(() => resolve())
      .catch(() => reject);
  });
}

export default function Settings({navigation}) {
  return (
    <View style={sharedStyles.body}>
      <View style={settingsStyle.topPart}>
        <Text color={COLOR.WHITE}>Settings</Text>
      </View>
      <View style={settingsStyle.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={sharedStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            onPress={() => {
              Logout()
                .then(() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'SigninOrRegister'}],
                    }),
                  );
                })
                .catch(err => console.log(err));
            }}>
            <Text color={COLOR.WHITE} h5 bold>
              Sign Out
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
