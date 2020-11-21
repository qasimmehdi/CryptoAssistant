import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ViewTransactions from '../transaction/view-transactions';
import coinPage from './coinPage';
import {COLOR} from '../shared/colors';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function CoinPageTabNav({navigation}) {
  const coinPageTitle = useSelector(state => state.setSelectedCoin.base);
  navigation.setOptions({title: coinPageTitle});

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLOR.WHITE,
        inactiveTintColor: COLOR.APP_GREY,
        style: {
          backgroundColor: COLOR.BG,
          borderTopWidth: 0,
          borderTopColor: COLOR.BG,
        },
      }}>
      <Tab.Screen
        name="coinPage"
        component={coinPage}
        options={{title: 'Details'}}
      />
      <Tab.Screen
        name="ViewTransactions"
        component={ViewTransactions}
        options={{title: 'Transactions'}}
      />
    </Tab.Navigator>
  );
}
