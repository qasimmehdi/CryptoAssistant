import React from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import { loginStyles } from '../styles/loginStyles';
import registerStyles from '../styles/registerStyles';
import {updateRegistration} from '../redux/actions/updateRegistration';

function EnterUsernameNC(props) {
    const [user, onChangeUser] = React.useState('');
    const info = props.register.info;
    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    placeholder="Username"
                    placeholderTextColor="#808080"
                    value={user}
                    onChangeText={onChangeUser}
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
                        onPress={
                            () => {
                                props.updateRegistration({username: user, password: info.password, email: info.email});
                                props.navigation.navigate('EnterPassword');
                            }
                        }
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterPasswordNC({ navigation }) {
    const [pass, onChangePass] = React.useState('');

    return (
        <View style={registerStyles.body}>
            <View style={registerStyles.inputContainer}>
                <Input
                    style={loginStyles.input}
                    password
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    value={pass}
                    onChangeText={onChangePass}
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
                        onPress={() => (navigation.navigate('AccountCreated'))}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

function EnterEmailNC({ navigation }) {
    const [email, onChangeEmail] = React.useState('');

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
                        onPress={() => (navigation.navigate('EmailAdded'))}
                    >
                        <Text color={'#fff'} h5 bold>Next</Text>
                    </Button>
                </LinearGradient>

            </View>
        </View>

    );
}

const MapStateToProps = (state) => {
    return {
        register: state.register
    };
};
const MapDispatchToProps = (dispatch) => {
    return {
        updateRegistration: () => dispatch(updateRegistration)
    }
};

export const EnterUsername = connect(MapStateToProps, MapDispatchToProps)(EnterUsernameNC);
export const EnterPassword = connect(MapStateToProps, MapDispatchToProps)(EnterPasswordNC);
export const EnterEmail = connect(MapStateToProps, MapDispatchToProps)(EnterEmailNC);

//export { EnterUsername, EnterPassword, EnterEmail };
