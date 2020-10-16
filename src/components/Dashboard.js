import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { dashboardStyles } from '../styles/dashboardStyles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {COLOR} from './shared/colors';
import Row from './dashboard.row';
import Hr from './shared/hr';
import { ScrollView } from 'react-native';

function Dashboard({navigation}) {
    const temp = [
        {
            name: "BTC", price: "$381.64",
            priceChange: "-205.07", holdingConverted: "$2,623.00",
            holdingUnits: "10", notification: true, balance: true
        },
        {
            name: "ETH", price: "$381.64",
            priceChange: "+205.07", holdingConverted: "$2,623.00",
            holdingUnits: "10", notification: true, balance: true
        },
    ]
    const [balance] = useState('0');
    const [coinsData, setCoinsData] = useState([...temp]);

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

            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                {coinsData.map(coin => (
                    <Row
                        name={coin.name}
                        price={coin.price}
                        priceChange={coin.priceChange}
                        holdingConverted={coin.holdingConverted}
                        holdingUnits={coin.holdingUnits}
                        notification={coin.notification}
                        balance={coin.balance}
                        key={coin.name}
                    />
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