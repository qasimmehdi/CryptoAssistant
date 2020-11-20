import {Button, Text} from 'galio-framework';
import React, {useState} from 'react';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {notificationsStyle} from './AddNotifications.style';
import LinearGradient from 'react-native-linear-gradient';
import {addNotification} from '../../services/user.services';
import {useSelector} from 'react-redux';
import {setNotification} from '../../db/methods';

export default function AddNotifications({route, navigation}) {
  const {base, quote, isNotificationOn} = route.params;
  const [disableBtn, setDisableBtn] = useState(false);
  console.log('base', base, 'quote', quote);
  const fcmToken = useSelector(state => state.fcmToken.token);
  return (
    <View style={sharedStyles.body}>
      <View style={notificationsStyle.infoText}>
        <Text color={COLOR.WHITE} bold size={16}>
          {isNotificationOn
            ? 'Stop recieving alerts for the pair'
            : 'You will get two alerts a day about change in price'}
        </Text>
        <Text
          color={COLOR.WHITE}
          bold
          size={16}
          style={notificationsStyle.pairInfo}>
          Trading Pair
        </Text>
        <Text
          color={COLOR.WHITE}
          bold
          size={16}
          style={notificationsStyle.pairInfo}>{` ${base}/${quote}`}</Text>
      </View>

      <View style={notificationsStyle.saveBtn}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={sharedStyles.linearGradient}>
          <Button
            disabled={disableBtn}
            round
            color="transparent"
            style={sharedStyles.borderless}
            onPress={async () => {
              setDisableBtn(true);
              addNotification(
                isNotificationOn ? 'delete' : 'post',
                fcmToken,
                base,
                quote,
              )
                .then(
                  setNotification(isNotificationOn ? '0' : '1', base, quote)
                    .then(() => {
                      navigation.goBack();
                    })
                    .catch(err => {
                      console.log(err);
                    }),
                )
                .catch(err => {
                  console.log(err);
                  setDisableBtn(false);
                });
            }}>
            <Text color={COLOR.WHITE} h5 bold>
              {isNotificationOn ? 'Delete' : 'Save'}
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
