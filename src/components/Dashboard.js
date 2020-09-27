import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { loginStyles } from '../styles/loginStyles';
import {SDeleteInfo} from '../services/sensitiveStorage';


function Dashboard({ navigation }) {
    return (
        <View style={loginStyles.body}>
            <View style={loginStyles.title}>
                <Text color={'#fff'} h5 bold>Welcome to Home</Text>
                <View style={loginStyles.button}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1E4588', '#411471']} style={loginStyles.linearGradient}>
                        <Button round color='transparent' style={loginStyles.borderless}
                            onPress={(async () => {
                                await SDeleteInfo('auth_token');
                                navigation.navigate('SigninOrRegister');
                            })}
                        >
                            <Text color={'#9596C2'} h5 bold>Logout</Text>
                        </Button>
                    </LinearGradient>
                </View>
            </View>
        </View>

    );
}

export default Dashboard;
