/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'galio-framework';
import moment from 'moment';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import CCXT from '../../services/ccxt/react-ccxt';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import Loading from '../SplashScreen';
import {coinPageStyles} from './coinPageStyle';

export default function coinPage({navigation}) {
  const coinPageTitle = useSelector(state => state.setSelectedCoin.base);
  let ccxt = new CCXT();
  const [data, setData] = useState([1]);
  const [labels, setLabels] = useState([]);
  const [price, setPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  let labelRadix;
  useEffect(() => {
    navigation.setOptions({title: coinPageTitle});
    let isMounted = true;
    setIsLoading(true);
    ccxt
      .Candles(`${coinPageTitle}/USD`, '1d')
      .then(resp => {
        console.log(resp);
        let tempData = [],
          tempLabels = [];
        labelRadix = Math.max(Math.floor(resp.length / 4), 1);
        resp.forEach((i, j) => {
          tempData.push(i[4]);
          tempLabels.push(
            j % labelRadix === 0 ? moment(i[0]).format('HH:mm') : '',
          );
        });
        console.log(tempData.join(' '));
        if (isMounted) {
          setData([...tempData]);
          setLabels([...tempLabels]);
          setPrice(tempData[tempData.length - 1]);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={coinPageStyles.body}>
      <Text color={COLOR.WHITE} h3 bold style={{flex: 1, margin: 10}}>
        {!isLoading && numeral(price).format('$0,0.[00]')}
      </Text>
      <View style={{flex: 6}}>
        {isLoading ? (
          <Loading />
        ) : (
          <LineChart
            data={{
              labels: [...labels],
              datasets: [
                {
                  data: [...data],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: COLOR.BG,
              backgroundGradientTo: COLOR.BG,
              backgroundColor: COLOR.BG,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              /* propsForBackgroundLines: {
                            strokeWidth: 0
                        }, */
              style: {
                borderRadius: 16,
                backgroundColor: COLOR.BG,
              },
              strokeWidth: 2,
            }}
            withInnerLines={false}
            withDots={false}
          />
        )}
      </View>
      <View style={{padding: 10, flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={sharedStyles.linearGradient}>
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            onPress={() => navigation.navigate('AIPredictionChart')}>
            <Text color={COLOR.WHITE} h5 bold>
              AI Coin chart predictor
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
