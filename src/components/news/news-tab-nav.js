import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {COLOR} from '../shared/colors';
import Article from './article';
import Sentiment from './sentiment';

const Tab = createMaterialTopTabNavigator();

export default function NewsTabNav({navigation}) {
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
        labelStyle: {textTransform: 'none'},
      }}>
      <Tab.Screen
        name="Sentiments"
        component={Sentiment}
        options={{tabBarLabel: 'Sentiments'}}
      />
      <Tab.Screen
        name="Articles"
        component={Article}
        options={{tabBarLabel: 'Articles'}}
      />
    </Tab.Navigator>
  );
}
