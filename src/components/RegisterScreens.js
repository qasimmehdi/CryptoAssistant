import { Button, Input, Text } from 'galio-framework';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/auth';
import * as Actions from '../store/actions';
import { loginStyles } from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import { COLOR } from './shared/colors';
import CustomInput from './shared/custom-input';
import * as regexs from './shared/regexs';
import Loading from './SplashScreen';

function EnterUsername({ navigation }) {
    const [disableNext, setDisableNext] = useState(true);
    const [gradientColors, setGradientColors] = useState([COLOR.DISABLED, COLOR.DISABLED]);
    const user = useSelector(state => state.EditUsername.username);
    const dispatch = useDispatch();
    const onChangeUser = (text) => {
        return dispatch(Actions.EditUsername({ username: text }))
    }
    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <CustomInput
                    style={loginStyles.input}
                    placeholder="Username"
                    placeholderTextColor="#808080"
                    value={user}
                    onChangeText={(text) => onChangeUser(text)}
                    color='#fff'
                    pattern={[regexs.user]}
                    onValidation={isValid => {
                        if (isValid[0] === true) {
                            setDisableNext(false);
                            setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
                        }
                        else {
                            setDisableNext(true);
                            setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
                        }
                    }}
                />
            </View>
            <View style={registerStyles.NextButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={gradientColors}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => navigation.navigate("EnterPassword")}
                        disabled={disableNext}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterPassword({ navigation }) {
    const [disableNext, setDisableNext] = useState(true);
    const [gradientColors, setGradientColors] = useState([COLOR.DISABLED, COLOR.DISABLED]);
    const pass = useSelector(state => state.EditPassword.password);
    const dispatch = useDispatch();
    const onChangePass = (text) => {
        return dispatch(Actions.EditPassword({ password: text }))
    }


    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <CustomInput
                    style={loginStyles.input}
                    password
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    value={pass}
                    onChangeText={(text) => onChangePass(text)}
                    color='#fff'
                    pattern={[regexs.password]}
                    onValidation={isValid => {
                        if (isValid[0] === true) {
                            setDisableNext(false);
                            setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
                        }
                        else {
                            setDisableNext(true);
                            setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
                        }
                    }}
                />
            </View>
            <View style={registerStyles.NextButton}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={gradientColors}
                    style={loginStyles.linearGradient}
                >
                    <Button round color='transparent' style={loginStyles.borderless}
                        onPress={() => (navigation.navigate('EnterEmail'))}
                        disabled={disableNext}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterEmail({ navigation }) {
    const [disableNext, setDisableNext] = useState(true);
    const [gradientColors, setGradientColors] = useState([COLOR.DISABLED, COLOR.DISABLED]);
    const [isLoading, setIsLoading] = useState(false)
    const email = useSelector(state => state.EditEmail.email);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onChangeEmail = (text) => {
        return dispatch(Actions.EditEmail({ email: text }))
    }

    return (
        <View style={registerStyles.body}>
            {
                isLoading ? <Loading /> :
                    <>
                        <View style={registerStyles.inputContainer}>
                            <CustomInput
                                style={loginStyles.input}
                                type="email-address"
                                placeholder="Email address"
                                placeholderTextColor="#808080"
                                value={email}
                                onChangeText={onChangeEmail}
                                color='#fff'
                                pattern={[regexs.email]}
                                onValidation={isValid => {
                                    if (isValid[0] === true) {
                                        setDisableNext(false);
                                        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
                                    }
                                    else {
                                        setDisableNext(true);
                                        setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
                                    }
                                }}
                            />
                        </View>
                        <View style={registerStyles.NextButton}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={gradientColors}
                                style={loginStyles.linearGradient}
                            >
                                <Button round color='transparent' style={loginStyles.borderless}
                                    onPress={(async () => {
                                        setIsLoading(true);
                                        if (await registerUser(state.EditUsername.username, state.EditPassword.password, state.EditEmail.email)) {
                                            navigation.navigate('AccountCreated');
                                        } else {
                                            Alert.alert("Something Went Wrong");
                                            navigation.navigate('SigninOrRegister');
                                        }
                                        setIsLoading(false);
                                    })}
                                    disabled={disableNext}
                                >
                                    <Text color={'#fff'} h5 bold>Next</Text>
                                </Button>
                            </LinearGradient>

                        </View>
                    </>
            }
        </View>
    );
}


export { EnterUsername, EnterPassword, EnterEmail };
//export { EnterUsername, EnterPassword, EnterEmail };
