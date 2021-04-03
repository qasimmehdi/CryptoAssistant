/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {View,Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import numeral from 'numeral';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CCXT from '../../services/ccxt/react-ccxt';

export default function TradeBotStarted({navigation, route}) {
  const [stop, setStop] = useState('');
  const [stopCopy, setStopCopy] = useState('');
  const [limit, setLimit] = useState('');
  const [last, setLast] = useState('');
  const [difference, setDifference] = useState('');
  const [exchange, setExchange] = useState('');
  const [quantity, setQuantity] = useState('');
  const [percentage, setPercentage] = useState('');
  const [pair, setPair] = useState('');
  const [runningTime, setRunningTime] = useState('');
  let ccxt = new CCXT();
  let timerId = null;
  let botId = null;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setExchange(route.params.exchange);
      setLimit(route.params.limit);
      setStop(route.params.stop);
      setQuantity(route.params.quantity);
      setPercentage(route.params.percentage);
      setPair(route.params.pair);
      timerId = startTimer();
      botId = startBot();
    } else {
      clearInterval(timerId);
      clearInterval(botId);
    }
  }, [isFocused]);

  const startTimer = () => {
    const startDate = new Date().getTime();

    const intervalId = setInterval(function() {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = now - startDate;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRunningTime(
        days + 'D ' + hours + 'H ' + minutes + 'M ' + seconds + 'S',
      );

      return intervalId;
    }, 1000);
  };


  const startBot = () => {
    const exchangeObj = ccxt.getExchangeObj(exchange);
    
    const intervalId = setInterval( async function() {

      const rate = await await exchangeObj.fetchTicker(pair.toUpperCase());

      if (rate && rate.last) {

        let stp = rate.last - ((parseInt(percentage)/ 100) * rate.last).toFixed(2);

        if(stopCopy === ''){
          setStop(stp);
          setStopCopy(stp);
        }

        if(stopCopy <= stp){
          setStop(stp);
        }

          setLast(rate.last ? rate.last : 0);
          setDifference(limit - rate.last);

          if(rate.last >= limit){
              ccxt.createOrder(exchange,pair,'sell',parseInt(quantity),parseFloat(limit));
              Alert("Success","Order successfully created");
          }
          else if(rate.last <= stop){
            ccxt.createOrder(exchange,pair,'sell',parseInt(quantity),parseFloat(stop));
            Alert("Success","Order successfully created");
          }

      }

      return intervalId;
    }, 5000);
  };

  return (
    <View style={sharedStyles.body}>
      <ScrollView>
        <View style={{display: 'flex', flex: 1}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Stop Price ({pair.split('/')[1]})
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(stop).format('0,0[.][0000]')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Limit Price ({pair.split('/')[1]})
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(limit).format('0,0[.][0000]')}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Last Price ({pair.split('/')[1]})
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(last).format('0,0[.][0000]')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Difference ({pair.split('/')[1]})
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(difference).format('0,0[.][0000]')}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Quantity ({pair.split('/')[0]})
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(quantity).format('0,0[.][0000]')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Percentage
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {numeral(percentage).format('0,0[.][0000]')}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Echange
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {exchange}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color={COLOR.APP_GREY} size={15}>
                Currency Pair
              </Text>
              <Text color={COLOR.WHITE} size={20}>
                {pair}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color={COLOR.APP_GREY} size={14}>
              Running for {runningTime}
            </Text>
            <TouchableOpacity
              style={{
                borderColor: COLOR.APP_GREY,
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate('TradeBot');
                console.log('object');
              }}>
              <FontAwesome5Icon
                name={'power-off'}
                size={20}
                color={COLOR.APP_GREY}
                style={{
                  padding: 5,
                  display: 'flex',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
