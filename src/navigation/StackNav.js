import React from 'react';
import SimpleLogin from '../components/SimpleLogin';
import SigninOrRegister from '../components/SigninOrRegister';
import {
  ForgetEnterEmail,
  ResetPassword,
} from '../components/ForgetPasswordScreens';
import {
  EnterEmail,
  EnterPassword,
  EnterUsername,
} from '../components/RegisterScreens';
import AccountCreated from '../components/AccountCreated';
import EmailAdded from '../components/EmailAdded';
import StartupScreen from '../components/StartupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import coinPage from '../components/coin/coinPage';
import {COLOR} from '../components/shared/colors';
import TabNavigation from './TabNav';
import AddTransaction from '../components/transaction/add-transaction';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR.BG,
        },
        headerTintColor: COLOR.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SigninOrRegister"
        component={SigninOrRegister}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EnterUsername"
        component={EnterUsername}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="AccountCreated"
        component={AccountCreated}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="EmailAdded"
        component={EmailAdded}
        options={{title: ''}}
      />
      <Stack.Screen name="Dashboard" component={TabNavigation} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{title: 'Reset Password'}}
      />
      <Stack.Screen
        name="ForgetEnterEmail"
        component={ForgetEnterEmail}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen name="Sign In" component={SimpleLogin} />
      <Stack.Screen
        name="coinPage"
        component={coinPage}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{title: 'Add Transaction'}}
      />
    </Stack.Navigator>
  );
}
