/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {Text} from 'galio-framework';
import moment from 'moment';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import CCXT from '../../services/ccxt/react-ccxt';
import {COLOR} from '../shared/colors';
import Loading from '../SplashScreen';
import {coinPageStyles} from './coinPageStyle';

export default function AIPredictionChart({navigation}) {
  const coinPageTitle = useSelector(state => state.setSelectedCoin.base);
  let ccxt = new CCXT();
  const [data, setData] = useState([1]);
  const [data2, setData2] = useState([1]);
  const [labels, setLabels] = useState([]);
  const [price, setPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  let labelRadix;
  useEffect(() => {
    navigation.setOptions({title: coinPageTitle + ' Prediction'});
    let isMounted = true;
    setIsLoading(true);
    ccxt
      .Candles(`${coinPageTitle}/USD`, '1d')
      .then(resp => {
        console.log(resp);
        let tempData = [];
        let tempData2 = [];
        let tempLabels = [];
        labelRadix = Math.max(Math.floor(resp.length / 4), 1);
        resp.forEach((i, j) => {
          tempData.push(i[4]);
          tempData2.push(i[4]);
          tempLabels.push(
            j % labelRadix === 0 ? moment(i[0]).format('HH:mm') : '',
          );
        });
        const len = tempData2.length - 1;
        let lastTime = resp[resp.length - 1][0];
        for (let i = len; i < len + 10; i++) {
          lastTime += 900000;
          tempData2.push(tempData2[i] + 10);
          tempLabels.push(
            i % labelRadix === 0 ? moment(lastTime).format('HH:mm') : '',
          );
        }
        console.log(tempData.join(' '));
        if (isMounted) {
          setData([...tempData]);
          setLabels([...tempLabels]);
          setPrice(tempData[tempData.length - 1]);
          setData2([...tempData2]);
          console.log(tempLabels);
          console.log(tempData2);
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
                  data: [...data2],
                  color: (opacity = 1) => `rgba(135, 89, 206,${opacity})`,
                },
                {
                  data: [...data],
                  color: (opacity = 1) => `rgba(0, 255, 0,${opacity})`,
                },
              ],
              legend: ['Market', 'Prediction'],
            }}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel="$"
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: COLOR.BG,
              backgroundGradientTo: COLOR.BG,
              backgroundColor: COLOR.BG,
              backgroundGradientFromOpacity: 1,
              backgroundGradientToOpacity: 1,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              fillShadowGradientOpacity: 1,
              style: {
                borderRadius: 16,
                backgroundColor: COLOR.BG,
                opacity: 1,
              },
              strokeWidth: 2,
            }}
            withShadow={false}
            withInnerLines={false}
            withDots={false}
          />
        )}
      </View>
    </View>
  );
}
