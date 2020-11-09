import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../components/settings/Settings';
import Dashboard from '../components/Dashboard';
import TabNavigation from './TabNav';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={TabNavigation} />
    </Drawer.Navigator>
  );
}
