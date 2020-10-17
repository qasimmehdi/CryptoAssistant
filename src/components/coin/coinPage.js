import React, { useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Text } from 'galio-framework';
import { coinPageStyles } from './coinPageStyle';
import { COLOR } from '../shared/colors';
import { LineChart } from "react-native-chart-kit";
import CCXT from '../../services/ccxt/react-ccxt';
import { Dimensions } from "react-native";
import numeral from 'numeral';

export default function coinPage() {
    let ccxt = new CCXT();
    const [data, setData] = useState([1]);
    const [labels, setLabels] = useState([]);
    const [price, setPrice] = useState('0');
    useEffect(() => {
        ccxt.Candles("BTC/USD", "1d")
        .then(resp => {
            console.log(resp);
            let temp = resp.map((i) => (i[4]));
            console.log(temp);
            setData([...temp]);
            setPrice(temp[temp.length - 1]);
        })
        .catch(err => console.log(err))
    },[])

    return (
        <View style={coinPageStyles.body}>
            <Text color={COLOR.WHITE} h3 bold style={{ flex: 1, margin: 10 }}>
                {numeral(price).format('$0,0.0[0000000]')}
            </Text>
            <View style={{ flex: 6 }}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [...data]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: COLOR.BG,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: "0",
                            strokeWidth: "1",
                            stroke: "#ffa726"
                        },
                        style: {
                            borderRadius: 16,
                            backgroundColor: COLOR.BG
                        }
                    }}
                    withDots={false}
                />
            </View>
        </View>
    );
}