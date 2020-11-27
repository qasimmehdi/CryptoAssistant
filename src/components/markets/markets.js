/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import {Text} from 'galio-framework';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import * as Actions from '../../store/actions';
import {dashboardStyles} from '../../styles/dashboardStyles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Hr from '../shared/hr';
import {styles} from './markets.style';
import {ScrollView} from 'react-native';
import MarketRow from './market-rows';
import {TouchableOpacity} from 'react-native';

export default function MarketScreen({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  const onClickCoin = coin => {
    return dispatch(Actions.setSelectedCoin({base: coin, quote: 'USD'}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle('Markets');
    }
  }, [isFocused]);
  return (
    <View style={sharedStyles.body}>
      <View style={styles.thead}>
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadCoin}>
          Rank
        </Text>
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadPrice}>
          PRICE
        </Text>
        <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" />
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadHoldings}>
          CAP / VOL
        </Text>
        <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" />
      </View>
      <Hr color={COLOR.APP_GREY} />
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            onClickCoin('BTC');
            navigation.navigate('CoinPageTabNav');
          }}>
          <MarketRow
            name="BTC"
            price="$12,000"
            priceChange="12%"
            cap="$309.29B"
            vol="$57.37B"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
