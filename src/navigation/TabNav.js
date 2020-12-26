/* eslint-disable react-hooks/exhaustive-deps */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AddCoin from '../components/add-favourite/AddCoin';
import MarketScreen from '../components/markets/markets';
import NewsScreen from '../components/news/news';
import {COLOR} from '../components/shared/colors';
import TradingScreen from '../components/trade/trade';
import DrawerNav from './DrawerNav';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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
        iconStyle: {
          //marginTop: 10,
          marginBottom: -25,
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
      <Tab.Screen
        name="Add Coin"
        component={AddCoin}
        options={{
          title: '',
          tabBarIcon: ({color}) => (
            <AntDesignIcon name={'pluscircle'} size={30} color={COLOR.WHITE} />
          ),
        }}
      />
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
