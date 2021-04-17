import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ViewTransactions from "../transaction/view-transaction";
import CoinPage from "./coinPage";
import { COLOR } from "../shared/colors";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator(); //creating tab navigation

export default function CoinPageTabNav({ navigation, route }) {
  const coinPageTitle = useSelector((state) => state.setSelectedCoin.base);
  navigation.setOptions({ title: coinPageTitle });

  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: COLOR.WHITE,
        inactiveTintColor: COLOR.APP_GREY,
        style: {
          backgroundColor: COLOR.BG,
          borderTopWidth: 0,
          borderTopColor: COLOR.BG,
        },
        labelStyle: { textTransform: "none" },
      }}
    >
      <Tab.Screen
        name="coinPage"
        children={(props) => <CoinPage {...props} route={route} />}
        options={{ title: "Details" }}
      />
      <Tab.Screen
        name="ViewTransactions"
        component={ViewTransactions}
        options={{ title: "Transactions" }}
      />
    </Tab.Navigator>
  );
}
