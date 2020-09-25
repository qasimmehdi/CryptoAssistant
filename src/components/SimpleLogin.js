import React, {useEffect} from 'react';
import { View, TouchableHighlight, Alert } from 'react-native';
import { Input, Button, Text, theme } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import { loginUser } from '../services/auth';

import { loginStyles } from '../styles/loginStyles';
import { useIsFocused } from "@react-navigation/native";



function LoginForm({ navigation }) {
  const [user, onChangeUser] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    onChangeUser('');
    onChangePass('');
  }, [isFocused ]);

  return (
    <View style={loginStyles.body}>
      <View style={loginStyles.centerForm}>
        <View style={loginStyles.sectionContainer}>
          <Input
            style={loginStyles.input}
            type='email-address'
            placeholder="Email address or username"
            placeholderTextColor="#808080" 
            value={user}
            onChangeText={onChangeUser}
            color='#fff'
          />
          <Input
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="#808080" 
            password
            viewPass
            iconColor='#808080'
            color='#fff'
            value={pass}
            onChangeText={onChangePass}
          />
        </View>
        <TouchableHighlight style={loginStyles.forgotPassword} onPress={() => navigation.navigate('Forgot Password')}>
          <Text color={'#808080'} size={11} bold>
            Forgot Password?
          </Text>
        </TouchableHighlight>

      </View>
      <View style={loginStyles.button}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#1E4588','#411471']} style={loginStyles.linearGradient}>
        <Button round color='transparent' style={loginStyles.borderless}
          onPress={(async () => {
            await loginUser(user, pass) ? navigation.navigate('Dashboard') : Alert.alert("Login Unsuccessful")
          })}
        >
          <Text color={'#9596C2'} h5 bold>Sign In</Text>
        </Button>
        </LinearGradient>
      </View>
      
    </View>

  );
}

export default LoginForm;