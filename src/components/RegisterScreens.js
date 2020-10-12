import React from 'react';
import { View, Alert } from 'react-native';
import { Input, Button, Text } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { loginStyles } from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { registerUser } from '../services/auth'

function EnterUsername({ navigation }) {
    const user = useSelector(state => state.EditUsername.username);
    const dispatch = useDispatch();
    const onChangeUser = (text) => {
        return dispatch(Actions.EditUsername({ username: text }))
    }
    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    placeholder="Username"
                    placeholderTextColor="#808080"
                    value={user}
                    onChangeText={(text) => onChangeUser(text)}
                    color='#fff'
                />
            </View>
            <View style={registerStyles.NextButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => navigation.navigate("EnterPassword")}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterPassword({ navigation }) {
    const pass = useSelector(state => state.EditPassword.password);
    const dispatch = useDispatch();
    const onChangePass = (text) => {
        return dispatch(Actions.EditPassword({ password: text }))
    }


    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    password
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    value={pass}
                    onChangeText={(text) => onChangePass(text)}
                    color='#fff'
                />
            </View>
            <View style={registerStyles.NextButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => (navigation.navigate('EnterEmail'))}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterEmail({ navigation }) {
    const email = useSelector(state => state.EditEmail.email);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onChangeEmail = (text) => {
        return dispatch(Actions.EditEmail({ email: text }))
    }

    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    type="email-address"
                    placeholder="Email address"
                    placeholderTextColor="#808080"
                    value={email}
                    onChangeText={onChangeEmail}
                    color='#fff'
                />
            </View>
            <View style={registerStyles.NextButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#2475FC', '#6912CB']}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={(async () => {
                            if (await registerUser(state.EditUsername.username, state.EditPassword.password, state.EditEmail.email)) {
                                navigation.navigate('AccountCreated');
                            } else {
                                Alert.alert("Something Went Wrong");
                                navigation.navigate('SigninOrRegister');
                            }
                        })}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}


export { EnterUsername, EnterPassword, EnterEmail };
//export { EnterUsername, EnterPassword, EnterEmail };
