import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SInfoGet } from '../services/sensitiveStorage';

import { loginStyles } from '../styles/loginStyles';
import Loading from './SplashScreen';
import { CommonActions } from "@react-navigation/native";

const check = async (navigation) => {
    let token = await SInfoGet('auth_token');
        if (token != null) {
            console.log(true);
            //navigation.navigate('Dashboard');
            navigation.dispatch(
                CommonActions.reset({
                   index: 0,
                   routes: [{ name: "Dashboard" }],
               })
           );
        }
        else {
            console.log(false);
            navigation.navigate('SigninOrRegister');
        }
}

const StartupScreen = ({ navigation }) => {
    useEffect(() => {
        check(navigation);
    }, []);
    return (
        <View style={loginStyles.body}>
            <Loading />
        </View>
    );

}
export default StartupScreen;