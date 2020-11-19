import {Button, Input, Text} from 'galio-framework';
import React, {useState} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {styles} from './connect-exchange.style';

export default function ConnectExchange({route, navigation}) {
  const {name} = route.params;
  const [api, setApi] = useState('');
  const [secret, setSecret] = useState('');
  return (
    <View style={sharedStyles.body}>
      <View style={styles.inputForm}>
        <Text color={COLOR.APP_GREY} bold>
          Connection Name
        </Text>
        <Text color={COLOR.WHITE} bold>
          {name}
        </Text>
        <View>
          <Input
            style={sharedStyles.input}
            placeholder="API Key"
            placeholderTextColor={COLOR.APP_GREY}
            value={api}
            onChangeText={setApi}
            color={COLOR.WHITE}
          />
          <Input
            style={sharedStyles.input}
            placeholder="Secret Key"
            placeholderTextColor={COLOR.APP_GREY}
            value={secret}
            onChangeText={setSecret}
            color={COLOR.WHITE}
          />
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={sharedStyles.linearGradient}>
          <Button round color="transparent" style={sharedStyles.borderless}>
            <Text color={COLOR.WHITE} h5 bold>
              Add Connection
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
