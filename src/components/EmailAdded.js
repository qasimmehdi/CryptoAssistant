import React from 'react';
import { View } from 'react-native';
import { Button, Text, theme } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';

import { loginStyles } from '../styles/loginStyles';

function EmailAdded({ navigation }) {
    let email = "qasim_127@hotmail.com"
    return (
        <View style={loginStyles.body}>
            <View style={{...loginStyles.title, alignSelf: 'flex-start', marginLeft: 15, marginRight: 15}}>
                <Text h3 color={theme.COLORS.WHITE} bold style={{marginBottom: 10}}>
                    {"All set here!\nCheck your email."}
                </Text>
                <Text color={'#808080'}>
                    {`We have sent an email to\n${email}\nto verify your email address.`}
                </Text>
            </View>
            <View style={loginStyles.SigninOrRegisterButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => (navigation.navigate('Dashboard'))}
                    >
                        <Text color={'#fff'} h5 bold>Done</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

export default EmailAdded;
