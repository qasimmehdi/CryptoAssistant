import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SInfoGet } from '../services/sensitiveStorage';

import { loginStyles } from '../styles/loginStyles';


import Loading from './SplashScreen';

const check = async (navigation) => {
    let token = await SInfoGet('auth_token');
        if (token != null) {
            console.log(true);
            navigation.navigate('Dashboard');
        }
        else {
            console.log(false);
            navigation.navigate('SigninOrRegister');
        }
}

const Loader = ({ navigation }) => {
    useEffect(() => {
        check(navigation);
    }, []);
    return (
        <View style={loginStyles.body}>
            <Loading />
        </View>
    );

}
export default Loader;