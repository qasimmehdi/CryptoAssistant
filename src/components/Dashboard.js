import React from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework';
import { loginStyles } from '../styles/loginStyles';

function Dashboard() {
    return (
        <View style={loginStyles.body}>
            <View style={loginStyles.title}>
                <Text color={'#fff'} h5 bold>Welcome to Home</Text>
            </View>
        </View>

    );
}

export default Dashboard;
