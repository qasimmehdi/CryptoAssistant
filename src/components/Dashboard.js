/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import {Text} from 'galio-framework';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {getFavourites} from '../db/methods';
import CCXT from '../services/ccxt/react-ccxt';
import * as Actions from '../store/actions';
import {dashboardStyles} from '../styles/dashboardStyles';
import Row from './dashboard.row';
import {COLOR} from './shared/colors';
import Hr from './shared/hr';
import Loading from './SplashScreen';

function Dashboard({navigation}) {
  const isFocused = useIsFocused();
  const ccxt = new CCXT();
  const [balance] = useState('0');
  const [coinsData, setCoinsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const onClickCoin = coin => {
    return dispatch(Actions.setSelectedCoin({base: coin, quote: 'USD'}));
  };
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };

  function updateTable(data, tempArray) {
    console.log('updateTable', data);
    console.log('updateTable coinsData', tempArray);
    let tempCoinsData = tempArray;
    for (let i = 0; i < tempCoinsData.length; i++) {
      let pair = `${tempCoinsData[i].name}-USD`;
      console.log(pair);
      tempCoinsData[i].price = numeral(data[pair].last).format('$0,0.0[0000]');
      tempCoinsData[i].priceChange = numeral(data[pair].change).format(
        '+0,0.0[0000]',
      );
    }
    console.log('updateTable', tempCoinsData);
    return tempCoinsData;
  }

  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle('Crypto Assistant');
    }
  }, [isFocused]);

  /* useEffect(() => {
    if (isFocused) {
      let favPairs = coinsData.map(i => `${i.name}/${i.quote}`);
      console.log(favPairs);
      setIsLoading(true);
      ccxt
        .coinDetails(favPairs)
        .then(resp => {
          console.log('resp', resp);
          setCoinsData([...updateTable(resp)]);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coinsData.length]); */

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      let tempArray = [];
      getFavourites()
        .then(resp => {
          const len = resp.length;
          console.log('dashboard get favourites', resp);
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < resp[i].rows.length; j++) {
              let item = resp[i].rows.item(j);
              console.log(item);
              tempArray.push({
                name: item.base,
                quote: item.quote,
                price: '0',
                priceChange: '0',
                changePercentage: '0',
                holdingConverted: '0',
                holdingUnits: item.balance,
                notification: item.notification === '1' ? true : false,
                balance: parseFloat(item.balance) > 0 ? true : false,
              });
            }
          }
          console.log('tempArray', tempArray);
          setCoinsData([...tempArray]);
          let favPairs = tempArray.map(i => `${i.name}/${i.quote}`);
          ccxt
            .coinDetails(favPairs)
            .then(resp2 => {
              console.log('resp', resp2);
              setCoinsData([...updateTable(resp2, tempArray)]);
            })
            .catch(err => console.log(err))
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch(err => console.log(err));
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    console.log('refreshing', coinsData);
    let favPairs = coinsData.map(i => `${i.name}/USD`);
    ccxt
      .coinDetails(favPairs)
      .then(resp => {
        console.log('resp', resp);
        setCoinsData([...updateTable(resp, coinsData)]);
      })
      .catch(err => console.log(err))
      .finally(() => setRefresh(false));
  }, [coinsData]);

  return (
    <View style={dashboardStyles.body}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
        style={dashboardStyles.linearGradient}>
        <View style={dashboardStyles.topCard}>
          <View style={dashboardStyles.leftView}>
            <Text color={COLOR.WHITE} h5 style={dashboardStyles.topCardText}>
              Main Portfolio
            </Text>
            <Text
              color={COLOR.WHITE}
              h4
              bold
              style={dashboardStyles.topCardText}>
              ${`${balance}`}
            </Text>
          </View>
          <View style={dashboardStyles.rightView}>
            <Text
              color={COLOR.WHITE}
              h6
              style={{...dashboardStyles.topCardText, textAlign: 'right'}}>
              24HR
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={dashboardStyles.container}>
        <View style={dashboardStyles.thead}>
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadCoin}>
            COIN
          </Text>
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadPrice}>
            PRICE
          </Text>
          {/* <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" /> */}
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadHoldings}>
            HOLDINGS
          </Text>
          {/* <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" /> */}

          <Icon
            name="notifications"
            color={COLOR.APP_GREY}
            style={dashboardStyles.theadBell}
          />
        </View>
        <Hr color={COLOR.APP_GREY} />

        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          {isLoading ? (
            <Loading />
          ) : (
            coinsData.map(coin => (
              <TouchableOpacity
                key={coin.name}
                onPress={() => {
                  onClickCoin(coin.name);
                  navigation.navigate('CoinPageTabNav');
                }}>
                <Row
                  name={coin.name}
                  price={coin.price}
                  priceChange={coin.priceChange}
                  holdingConverted={coin.holdingConverted}
                  holdingUnits={coin.holdingUnits}
                  notification={coin.notification}
                  balance={coin.balance}
                  navigation={navigation}
                  quote={coin.quote}
                />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default Dashboard;
