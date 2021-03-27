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
import {COLOR} from '../components/shared/colors';
import TabNavigation from './TabNav';
import AddTransaction from '../components/transaction/add-transaction';
import AddNotifications from '../components/notfication/AddNotifications';
import DrawerNav from './DrawerNav';
import Settings from '../components/settings/Settings';
import ConnectExchange from '../components/connect-exchange/exchange-form';
import ExchangeList from '../components/connect-exchange/exchange-list';
import CoinPageTabNav from '../components/coin/coinTabNav';
import SelectExchangeList from '../components/trade/exchanges';
import AIPredictionChart from '../components/coin/AIPredictionChart';
import Help from '../components/help/help';
import Graph from '../components/Graph';

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
      }}
      initialRouteName="StartupScreen">
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
        name="CoinPageTabNav"
        component={CoinPageTabNav}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{title: 'Add Transaction'}}
      />
      <Stack.Screen
        name="AddNotification"
        component={AddNotifications}
        options={{title: 'Add Notification'}}
      />
      <Stack.Screen name="Drawer" component={DrawerNav} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="ConnectExchange" component={ConnectExchange} />
      <Stack.Screen name="ExchangeList" component={ExchangeList} />
      <Stack.Screen name="SelectExchangeList" component={SelectExchangeList} />
      <Stack.Screen
        name="AIPredictionChart"
        component={AIPredictionChart}
        options={{title: 'AI Coin Predictor'}}
      />
      <Stack.Screen name="Help" component={Help} options={{title: 'Help'}} />
      <Stack.Screen name="Graph" component={Graph} options={{title: 'Graph'}} />
    </Stack.Navigator>
  );
}
