/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../components/Dashboard';
import {COLOR} from '../components/shared/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';
import {useIsFocused} from '@react-navigation/native';
import AddCoin from '../components/add-favourite/AddCoin';
import DrawerNav from './DrawerNav';

function TradingScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle('Trade');
    }
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Trade!</Text>
    </View>
  );
}

function MarketScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle('Markets');
    }
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Markets!</Text>
    </View>
  );
}

function NewsScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    console.log('News', isFocused);
    if (isFocused) {
      changeTitle('News');
    }
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>News!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigation({navigation}) {
  const HeaderTitle = useSelector(state => state.Header.title);

  useEffect(() => {
    navigation.setOptions({title: HeaderTitle});
  }, [HeaderTitle]);
  return (

    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: COLOR.WHITE,
        activeBackgroundColor: COLOR.TAB,
        inactiveBackgroundColor: COLOR.TAB,
        labelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        style: {
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DrawerNav}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="Trade"
        component={TradingScreen}
        options={{title: 'Trade'}}
      />
      <Tab.Screen name="Add Coin" component={AddCoin} options={{title: '+'}} />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{title: 'News'}}
      />
      <Tab.Screen
        name="Markets"
        component={MarketScreen}
        options={{title: 'Markets'}}
      />
    </Tab.Navigator>

  );
}
