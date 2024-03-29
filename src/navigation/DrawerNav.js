import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../components/Dashboard";
import { COLOR } from "../components/shared/colors";
import { TouchableOpacity, View } from "react-native";
import { Text } from "galio-framework";
import { CommonActions } from "@react-navigation/routers";
import { SDeleteInfo, SInfoSet, SInfoGet } from "../services/sensitiveStorage";
import IonicIcon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommun from "react-native-vector-icons/MaterialCommunityIcons";
import TouchId from "react-native-touch-id";
import { Switch } from "react-native";

const Drawer = createDrawerNavigator();

function Logout() {
  return new Promise((resolve, reject) => {
    SDeleteInfo("auth_token")
      .then(() => resolve())
      .catch(() => reject);
  });
}

function CustomDrawerContent({ navigation }) {
  const [showTouchId, setShowTouchId] = useState(false);
  const [touchEnabled, setTouchEnabled] = useState(false);

  useEffect(() => {
    TouchId.isSupported()
      .then(() => setShowTouchId(true))
      .catch(() => setShowTouchId(false));
    SInfoGet("touch_id").then((res) => {
      if (parseInt(res)) {
        setTouchEnabled(true);
      } else {
        setTouchEnabled(false);
      }
    });
  }, []);

  const handleTouchIdChange = (enabled) => {
    if (enabled) {
      SInfoSet("touch_id", "0");
    } else {
      SInfoSet("touch_id", "1");
    }
    setTouchEnabled((state) => !state);
  };

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
          <FontAwesome name={"exchange"} size={20} />
          <Text> Connect Exchange</Text>
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
          <MaterialCommun name={"account-cash-outline"} size={20} />
          <Text> Profit & Loss</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: COLOR.TAB,
          justifyContent: "center",
          minHeight: 50,
        }}
        onPress={() => {
          navigation.navigate("OpenOders");
        }}
      >
        <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
          <IonicIcon name={"receipt-outline"} size={20} />
          <Text> Open Orders</Text>
        </Text>
      </TouchableOpacity>

      {showTouchId && (
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.TAB,
            alignItems: "center",
            minHeight: 50,
            display: "flex",
            flexDirection: "row",
          }}
          onPress={() => handleTouchIdChange(touchEnabled)}
        >
          <Text style={{ marginLeft: 30 }} color={COLOR.WHITE} bold>
            <IonicIcon name={"finger-print-outline"} size={20} />
            <Text> Touch Id</Text>
          </Text>
          <Switch
            style={{ paddingLeft: 20 }}
            value={touchEnabled}
            onValueChange={() => handleTouchIdChange(touchEnabled)}
          />
        </TouchableOpacity>
      )}
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
          <IonicIcon name={"settings-outline"} size={20} />
          <Text> Settings</Text>
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
          <IonicIcon name={"help-circle-outline"} size={20} />
          <Text> Help</Text>
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
          <IonicIcon name={"exit-outline"} size={20} />
          <Text> Log Out</Text>
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
