/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import {Button, Input, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {View,Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import * as Actions from '../../store/actions';
import LinearGradient from 'react-native-linear-gradient';
import {transactionStyles} from '../transaction/add-transaction.style';
import {styles} from './trade.style';
import CCXT from '../../services/ccxt/react-ccxt';

export default function TradingScreen({navigation, route}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [buyBtnColor, setBuyBtnColor] = useState(COLOR.BUY);
  const [sellBtnColor, setSellBtnColor] = useState(COLOR.DISABLED);
  const [exchange, setExchange] = useState('Binance');
  const [base, setBase] = useState('BTC');
  const [quote, setQuote] = useState('ETH');
  const [price, setPrice] = useState(0);
  const [side, setSide] = useState('Buy');
  const [quantity, setQuantity] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [total, setTotal] = useState(0);

  const initiateOrder = () => {
    const ccxt = new CCXT();
    ccxt.createOrder(exchange,base+'/'+quote,side,quantity,price).then(x => {
      Alert.alert('Success',String(x));
    }).catch(err => {
      Alert.alert('Error',String(err));
    })
  }

  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle('Trade');
    }
  }, [isFocused]);
  return (
    <View style={sharedStyles.body}>
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
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Exchange
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={'right'}
            placeholder="Exchange"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={exchange}
            onChangeText={text => setExchange(text)}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Pair
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={'right'}
            placeholder="0"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={base + '/' + quote}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Price
          </Text>
          <Input
            style={transactionStyles.input}
            placeholder={`Price (${quote})`}
            textAlign={'right'}
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Quantity
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={'right'}
            placeholder={`Quantity (${quote})`}
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={quantity}
            onChangeText={text => setQuantity(text)}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Total
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={'right'}
            placeholder={`Total (${quote})`}
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={total}
            onChangeText={text => setTotal(text)}
          />
        </View>
      </View>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={gradientColors}
          style={sharedStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            //disabled={btnDisable}
            onPress={() => {initiateOrder()}}
            >
            <Text color={COLOR.WHITE} h5 bold>
              {`${side} ${base}`}
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
