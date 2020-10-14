import React from 'react';
import 'react-native-gesture-handler';
import Forgot from './src/components/Forgot';
import SimpleLogin from './src/components/SimpleLogin';
import SigninOrRegister from './src/components/SigninOrRegister';
import {ForgetEnterEmail, ResetPassword} from './src/components/ForgetPasswordScreens';
import { EnterEmail, EnterPassword, EnterUsername } from './src/components/RegisterScreens';
import AccountCreated from './src/components/AccountCreated';
import EmailAdded from './src/components/EmailAdded';
import Dashboard from './src/components/Dashboard';
import StartupScreen from './src/components/StartupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  //var initialRoute;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen name="StartupScreen" component={StartupScreen} options={{ title: '' }} />
        <Stack.Screen name="SigninOrRegister" component={SigninOrRegister} options={{ title: '' }} />
        <Stack.Screen name="EnterUsername" component={EnterUsername} options={{ title: 'Register' }} />
        <Stack.Screen name="EnterPassword" component={EnterPassword} options={{ title: 'Register' }} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} options={{ title: '' }} />
        <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ title: 'Register' }} />
        <Stack.Screen name="EmailAdded" component={EmailAdded} options={{ title: '' }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Home' }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Reset Password' }} />
        <Stack.Screen name="ForgetEnterEmail" component={ForgetEnterEmail} options={{ title: 'Forgot Password' }} />
        <Stack.Screen name="Sign In" component={SimpleLogin} />
        <Stack.Screen name="Forgot Password" component={Forgot} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;

//app start command
//gnome-terminal -e "react-native start" & react-native run-android