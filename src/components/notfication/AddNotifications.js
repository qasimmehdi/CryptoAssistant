import {Button, Text} from 'galio-framework';
import React, {useState} from 'react';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import CustomInput from '../shared/custom-input';
import {sharedStyles} from '../shared/shared.style';
import {regexes} from '../shared/regexes';
import {notificationsStyle} from './AddNotifications.style';
import LinearGradient from 'react-native-linear-gradient';

export default function AddNotifications({route, navigation}) {
  const {base, quote, currentPrice} = route.params;
  const [price, setPrice] = useState(currentPrice);
  return (
    <View style={sharedStyles.body}>
      <View style={notificationsStyle.infoText}>
        <Text color={COLOR.WHITE} bold size={16}>
          You will get two alerts a day about change in price
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
          <Button round color="transparent" style={sharedStyles.borderless}>
            <Text color={COLOR.WHITE} h5 bold>
              Save
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
