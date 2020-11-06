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
  const [exchange, setExchange] = useState('');
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  return (
    <View style={sharedStyles.body}>
      <View style={notificationsStyle.formFields}>
        <Text color={COLOR.WHITE}>
          You will get two alerts a day about change in price
        </Text>
        <CustomInput
          style={notificationsStyle.input}
          placeholder="Expected Price"
          placeholderTextColor={COLOR.APP_GREY}
          iconColor={COLOR.APP_GREY}
          color={COLOR.WHITE}
          value={price}
          onChangeText={text => setPrice(text)}
          pattern={[regexes.password]}
          /* onValidation={isValid => performValidation(isValid)} */
        />
        <Text color={COLOR.WHITE}>Trading Pair</Text>
        <Text color={COLOR.WHITE}>{`${base}/${quote}`}</Text>
      </View>
      <View style={notificationsStyle.saveBtn}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={gradientColors}
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
