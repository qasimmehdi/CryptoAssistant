import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { dashboardStyles } from '../styles/dashboardStyles';
import { Table, Row, Rows } from 'react-native-table-component';

function Dashboard({ }) {
    const [balance] = useState('0');
    const [tableHead] = useState(['Coins', 'Price', 'Holdings', '']);
    const [tableData, setTbaleData] = useState([
        ['BTC', '$11,392.1', 'Add', ''],
        ['ETH', '$376.04', 'Add', ''],
        ['BAT', '$2.55', 'Add', ''],
        ['ADA', '$28.84', 'Add', '']
    ]);

    return (
        <View style={dashboardStyles.body}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4774FC', '#6817CB']} style={dashboardStyles.linearGradient}>
                <View style={dashboardStyles.topCard}>
                    <View style={dashboardStyles.leftView}>
                        <Text color={'#fff'} h5 style={dashboardStyles.topCardText}>
                            Main Portfolio
                        </Text>
                        <Text color={'#fff'} h3 bold style={dashboardStyles.topCardText}>
                            ${`${balance}`}
                        </Text>

                    </View>
                    <View style={dashboardStyles.rightView}>
                        <Text color={'#fff'} h6
                            style={dashboardStyles.topCardText}>
                            24HR
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={dashboardStyles.container}>
                <Table borderStyle={dashboardStyles.tableBorder}>
                    <Row data={tableHead} widthArr={[100, 100, 100, 30]} style={dashboardStyles.head} textStyle={dashboardStyles.text} />
                    <Rows data={tableData} widthArr={[100, 100, 100, 30]} style={dashboardStyles.row} textStyle={dashboardStyles.text} />
                </Table>
            </View>
        </View>

    );
}

export default Dashboard;
