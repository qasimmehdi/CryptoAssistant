import React from 'react';
import {View, Alert, TouchableHighlight} from 'react-native';
import { Input, Button, Text, theme } from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import {loginStyles} from '../styles/loginStyles';

const success = 'Email sent successfully';
const failure = 'This account doesnot exist';
const login = (user) => {
    Alert.alert(success);
  };
  
  function Forgot({navigation}) {
    const [user, onChangeUser] = React.useState('');
  
    return (
      <LinearGradient colors={['#114357', '#f29492']} style={loginStyles.body}>
          <View style={loginStyles.title}>
              <Text h4 color={theme.COLORS.WHITE} bold>Forgot your password?</Text>
          </View>
          <View style={loginStyles.description}>
              <Text p color={theme.COLORS.WHITE}>Enter your email address and we'll send you a link to reset your password</Text>
          </View>
          <View style={loginStyles.sectionContainer}>
              <Input type='email-address' placeholder="Email" rounded borderless onChangeText={text => onChangeUser(text)}/>
          </View>
          <View style={loginStyles.button}>
              <Button round uppercase color={theme.COLORS.WHITE} size='small' onPress={() => login(user)}>
                <Text color={'#2e80e4'} h5 bold>SEND</Text>
              </Button>
          </View>
          <TouchableHighlight style={loginStyles.goBack} onPress={() => navigation.navigate('Sign In')}>
              <Text color={theme.COLORS.WHITE} bold size={13}>
                Go Back
              </Text>
          </TouchableHighlight>
      </LinearGradient>
      
    );
  }
  
  export default Forgot;