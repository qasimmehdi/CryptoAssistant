import React from 'react';
import { View } from 'react-native';
import { Button, Text, theme } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';

import { loginStyles } from '../styles/loginStyles';

function AccountCreated({ navigation }) {
    return (
        <View style={loginStyles.body}>
            <View style={{ ...loginStyles.title, alignSelf: 'flex-start', marginLeft: 15, marginRight: 15 }}>
                <Text h3 color={theme.COLORS.WHITE} bold style={{ marginBottom: 10 }}>
                    Account Created
                </Text>
                <Text color={'#808080'}>
                    {/* {"To be able to recover or reset your password \nyou'll need to add your email address."} */}
                </Text>
            </View>
            <View style={loginStyles.SigninOrRegisterButton}>
                {/* <Button round color='transparent' style={{ borderColor: '#808080', marginBottom: 20 }}
                    onPress={() => (navigation.navigate('Dashboard'))}
                >
                    <Text color={'#fff'} h5 bold>Skip</Text>
                </Button> */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={{ ...loginStyles.linearGradient, marginBottom: 20 }}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => (navigation.navigate('Sign In'))}
                    >
                        <Text color={'#fff'} h5 bold>Sign In</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

export default AccountCreated;
