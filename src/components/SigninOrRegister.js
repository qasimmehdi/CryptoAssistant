import React, { useEffect } from 'react';
import { View, TouchableHighlight, Alert } from 'react-native';
import { Input, Button, Text, theme } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { loginUser } from '../services/auth';

import { loginStyles } from '../styles/loginStyles';
import { useIsFocused } from "@react-navigation/native";

function SigninOrRegister({ navigation }) {
    return (
        <View style={loginStyles.body}>
            <View style={loginStyles.title}>
                <Text h3 color={theme.COLORS.WHITE} bold>Crypto Assistant</Text>
            </View>
            <View style={loginStyles.SigninOrRegisterButton}>
                <Button round color='transparent' style={{ borderColor: '#808080', marginBottom: 20 }}
                    onPress={() => (navigation.navigate('Sign In'))}
                >
                    <Text color={'#fff'} h5 bold>Sign In</Text>
                </Button>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={{ ...loginStyles.linearGradient, marginBottom: 20 }}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => (navigation.navigate('EnterUsername'))}
                    >
                        <Text color={'#fff'} h5 bold>Register</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

export default SigninOrRegister;
