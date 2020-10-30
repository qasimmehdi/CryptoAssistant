import { Button, Input, Text } from 'galio-framework';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { forgetGetCode, ModifyPassword } from '../services/auth';
import { loginStyles } from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';

function ForgetEnterEmail({ navigation }) {
    const [email, setEmail] = useState('');

    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    type="email-address"
                    placeholder="Email address"
                    placeholderTextColor="#808080"
                    value={email}
                    onChangeText={setEmail}
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
                            if (await forgetGetCode(email)) {
                                Alert.alert("Code Sent Successfully");
                                navigation.navigate("ResetPassword");
                            }
                            else {
                                Alert.alert("Something went wrong");
                            }
                        })}
                    >
                        <Text color={'#fff'} h5 bold>Get Code</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function ResetPassword({ navigation }) {
    const [code, setCode] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    type="number-pad"
                    placeholder="Code"
                    placeholderTextColor="#808080"
                    value={code}
                    onChangeText={setCode}
                    color='#fff'
                />
                <Input
                    style={loginStyles.input}
                    password
                    viewPass
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    value={pass}
                    onChangeText={setPass}
                    color='#fff'
                />
                <Input
                    style={loginStyles.input}
                    password
                    viewPass
                    placeholder="Re-enter Password"
                    placeholderTextColor="#808080"
                    value={pass2}
                    onChangeText={setPass2}
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
                            if (await ModifyPassword(code, pass2)) {
                                Alert.alert("Password Reset Successfully");
                                navigation.navigate("Sign In");
                            }
                            else {
                                Alert.alert("Something went wrong");
                            }
                        })}
                    >
                        <Text color={'#fff'} h5 bold>Save</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

export { ForgetEnterEmail, ResetPassword };
