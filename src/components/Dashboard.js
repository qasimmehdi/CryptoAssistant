import React, { useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Button, Text } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { dashboardStyles } from '../styles/dashboardStyles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { COLOR } from './shared/colors';
import Row from './dashboard.row';
import Hr from './shared/hr';
import { ScrollView } from 'react-native';
import CCXT from '../services/ccxt/react-ccxt';
import numeral from 'numeral';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';

function Dashboard({ navigation }) {
    const ccxt = new CCXT();
    const quotes = { BTC: "BTC", USD: "USD", ETH: "ETH" };
    const temp = [
        {
            name: "BTC", price: "0",
            priceChange: "0", changePercentage: "0", holdingConverted: "0",
            holdingUnits: "10", notification: true, balance: false
        },
        {
            name: "ETH", price: "0",
            priceChange: "0", holdingConverted: "$2,623.00",
            holdingUnits: "10", notification: true, balance: false
        },
    ];
    const [balance] = useState('0');
    const [coinsData, setCoinsData] = useState([...temp]);
    const [refresh, setRefresh] = useState(false);

    function updateTable(data){
        console.log(data);
        let tempCoinsData = coinsData;
        for (let i = 0; i < tempCoinsData.length; i++) {
            let pair = `${tempCoinsData[i].name}-USD`;
            console.log(pair);
            tempCoinsData[i].price = numeral(data[pair].last).format('$0,0.0[0000000]');
            tempCoinsData[i].priceChange = numeral(data[pair].change).format('+0,0.0[0000000]');
        }
        console.log(tempCoinsData);
        return tempCoinsData;
    }

    useEffect(() => {
        console.log("useEffect");
        let favPairs = coinsData.map((i) => (`${i.name}/USD`));
        console.log(favPairs);
        ccxt.coinDetails(favPairs)
            .then(
                resp => {
                    console.log("resp",resp);
                    setCoinsData([...updateTable(resp)]);
                }
            )
            .catch(err => console.log(err))
    }, []);

    const onRefresh = React.useCallback(() => {
        console.log("onRefresh");
        setRefresh(true);
        console.log("refreshing");
        let favPairs = coinsData.map((i) => (`${i.name}/USD`));
        ccxt.coinDetails(favPairs)
            .then(
                resp => {
                    console.log("resp",resp);
                    setCoinsData([...updateTable(resp)]);
                    setRefresh(false);
                }
            )
            .catch(err => console.log(err))
    },[]);

    return (
        <View style={dashboardStyles.body}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]} style={dashboardStyles.linearGradient}>
                <View style={dashboardStyles.topCard}>
                    <View style={dashboardStyles.leftView}>
                        <Text color={COLOR.WHITE} h5 style={dashboardStyles.topCardText}>
                            Main Portfolio
                        </Text>
                        <Text color={COLOR.WHITE} h4 bold style={dashboardStyles.topCardText}>
                            ${`${balance}`}
                        </Text>

                    </View>
                    <View style={dashboardStyles.rightView}>
                        <Text color={COLOR.WHITE} h6
                            style={dashboardStyles.topCardText}>
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
                        style={dashboardStyles.theadCoin}
                    >
                        COIN
                    </Text>
                    <Text
                        color={COLOR.APP_GREY}
                        size={12}
                        bold
                        style={dashboardStyles.theadPrice}>
                        PRICE
                    </Text>
                    <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down"></EntypoIcon>
                    <Text
                        color={COLOR.APP_GREY}
                        size={12}
                        bold
                        style={dashboardStyles.theadHoldings}>
                        HOLDINGS
                    </Text>
                    <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down"></EntypoIcon>

                    <Icon
                        name="notifications"
                        color={COLOR.APP_GREY}
                        style={dashboardStyles.theadBell}>
                    </Icon>
                </View>
                <Hr color={COLOR.APP_GREY} />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={onRefresh}/>
                    }
                >
                    {coinsData.map(coin => (
                        <TouchableOpacity
                         key={coin.name}
                         onPress={() => navigation.navigate('coinPage')}
                        >
                        <Row
                            name={coin.name}
                            price={coin.price}
                            priceChange={coin.priceChange}
                            holdingConverted={coin.holdingConverted}
                            holdingUnits={coin.holdingUnits}
                            notification={coin.notification}
                            balance={coin.balance}
                        />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>

        </View>

    );
}

export default Dashboard;
{/* <Icon.Button
    name="notifications-none"
    color="#fff"
    backgroundColor="#121212"
    style={dashboardStyles.theadBell}>
</Icon.Button> */}