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
import CCXT from '../../services/ccxt/react-ccxt';
import iconImages from '../../assets/coinIcons/names';

const ExchangeRow = props => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ConnectExchange', {name: props.name});
        }}>
        <View style={styles.row}>
          <View style={styles.coinCell}>
            <Image
              style={styles.exchangeIcon}
              uri={props.logo ? props.logo : iconImages.GENERIC}
            />
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
  const [exchanges, setexchanges] = React.useState(
    new CCXT().getAllExchangeAndLogo(),
  );

  return (
    <View style={sharedStyles.body}>
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        <Hr color={COLOR.APP_GREY} />
        {exchanges.map((x, i) => (
          <ExchangeRow
            key={i}
            navigation={navigation}
            name={x.name}
            logo={x.logo}
          />
        ))}
      </ScrollView>
    </View>
  );
}
