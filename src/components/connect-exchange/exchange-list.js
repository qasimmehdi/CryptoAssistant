/* eslint-disable react-native/no-inline-styles */
import {Text} from 'galio-framework';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import Hr from '../shared/hr';
import {styles} from './connect-exchange.style';
import {ScrollView} from 'react-native';

const ExchangeRow = props => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ConnectExchange');
        }}>
        <View style={styles.row}>
          <View style={styles.coinCell}>
            <Image style={styles.exchangeIcon} />
            <Text color={COLOR.WHITE} size={14} bold style={styles.coinitem}>
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Hr color={COLOR.APP_GREY} />
    </React.Fragment>
  );
};

export default function ExchangeList({navigation}) {
  return (
    <View style={sharedStyles.body}>
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        <Hr color={COLOR.APP_GREY} />
        <ExchangeRow navigation={navigation} name="Binance" />
      </ScrollView>
    </View>
  );
}
