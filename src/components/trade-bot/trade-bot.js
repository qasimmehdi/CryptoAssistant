/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import {Button, Input, Text} from 'galio-framework';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../shared/colors';
import {regexes} from '../shared/regexes';
import {sharedStyles} from '../shared/shared.style';
import {styles} from '../trade/trade.style';
import {transactionStyles} from '../transaction/add-transaction.style';

export default function TradeBotScreen({navigation, route}) {
  const name = route?.params?.name;
  console.log(name);
  const isFocused = useIsFocused();
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [buyBtnColor, setBuyBtnColor] = useState(COLOR.BUY);
  const [sellBtnColor, setSellBtnColor] = useState(COLOR.DISABLED);
  const [exchange, setExchange] = useState('');
  const [pair, setPair] = useState('ADA/BTC');
  const [side, setSide] = useState('Buy');
  const [quantity, setQuantity] = useState('');
  const [btnDisable, setBtnDisable] = useState(false);
  const [total, setTotal] = useState('');
  const [stop, setStop] = useState('');
  const [limit, setLimit] = useState('');
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    if (isFocused) {
      setExchange(route?.params?.name || '');
      console.log(route?.params?.name || '');
    }
  }, [isFocused]);

  useEffect(() => {
    const temp = numeral(parseFloat(limit) * parseFloat(quantity)).format(
      '0[.][0000]',
    );
    setTotal(temp);
  }, [limit, quantity]);

  useEffect(() => {
    if (exchange && pair && side && quantity && stop && limit && percentage) {
      setBtnDisable(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setBtnDisable(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [quantity, exchange, pair, side, stop, limit, percentage]);

  const startBot = () => {
    navigation.navigate('TradeBotStarted', {
      quantity,
      exchange,
      pair,
      side,
      stop,
      limit,
      percentage,
    });
  };

  return (
    <View style={sharedStyles.body}>
      <ScrollView>
        <View style={transactionStyles.formFields}>
          <View style={styles.row}>
            <Button
              color={buyBtnColor}
              style={styles.buysellbtn}
              onPress={() => {
                setSide('Buy');
                setBuyBtnColor(COLOR.BUY);
                setSellBtnColor(COLOR.DISABLED);
              }}>
              <Text color={COLOR.WHITE} h5 bold>
                Buy
              </Text>
            </Button>

            <Button
              color={sellBtnColor}
              style={styles.buysellbtn}
              onPress={() => {
                setSide('Sell');
                setBuyBtnColor(COLOR.DISABLED);
                setSellBtnColor(COLOR.SELL);
              }}>
              <Text color={COLOR.WHITE} h5 bold>
                Sell
              </Text>
            </Button>
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Exchange
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectExchangeList', {
                  redirect: 'TradeBot',
                })
              }>
              <Input
                style={transactionStyles.input}
                textAlign={'right'}
                placeholder="Exchange"
                placeholderTextColor={COLOR.APP_GREY}
                iconColor={COLOR.APP_GREY}
                color={COLOR.WHITE}
                editable={false}
                value={exchange}
              />
            </TouchableOpacity>
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Pair
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={'right'}
              placeholder="0"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={pair}
              onChangeText={text => setPair(text.toUpperCase())}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Stop
            </Text>
            <Input
              style={transactionStyles.input}
              placeholder={`Price (${pair.split('/')[1]})`}
              textAlign={'right'}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={stop}
              onChangeText={text => setStop(text.replace(regexes.float, ''))}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Limit
            </Text>
            <Input
              style={transactionStyles.input}
              placeholder={`Price (${pair.split('/')[1]})`}
              textAlign={'right'}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={limit}
              onChangeText={text => setLimit(text.replace(regexes.float, ''))}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Trailing Stop %
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={'right'}
              placeholder={'%'}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={percentage}
              onChangeText={text =>
                setPercentage(text.replace(regexes.float, ''))
              }
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Quantity
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={'right'}
              placeholder={`Quantity (${pair.split('/')[0]})`}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={quantity}
              onChangeText={text =>
                setQuantity(text.replace(regexes.float, ''))
              }
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}>
              Total
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={'right'}
              placeholder={`Total (${pair.split('/')[1]})`}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={total}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{paddingBottom: 5}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={gradientColors}
          style={sharedStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            disabled={btnDisable}
            onPress={startBot}>
            <Text color={COLOR.WHITE} h5 bold>
              Start Bot
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
