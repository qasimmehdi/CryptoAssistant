import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../components/Dashboard";
import { COLOR } from "../components/shared/colors";
import { TouchableOpacity } from "react-native";
import { Text } from "galio-framework";
import { CommonActions } from "@react-navigation/routers";
import { SDeleteInfo } from "../services/sensitiveStorage";

const Drawer = createDrawerNavigator();

function Logout() {
  return new Promise((resolve, reject) => {
    SDeleteInfo("auth_token")
      .then(() => resolve())
      .catch(() => reject);
  });
}

function CustomDrawerContent({ navigation }) {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          navigation.navigate("ExchangeList");
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          Connect Exchange
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          navigation.navigate("PNL");
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          Profit & Loss
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          navigation.navigate("Help");
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          Help
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          Logout()
            .then(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "SigninOrRegister" }],
                })
              );
            })
            .catch((err) => console.log(err));
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          Log Out
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerStyle={{ backgroundColor: COLOR.TAB }}
      drawerContentOptions={{
        activeTintColor: COLOR.WHITE,
        inactiveTintColor: COLOR.APP_GREY,
        activeBackgroundColor: COLOR.APP_GREY,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Dashboard} />
    </Drawer.Navigator>
  );
}
