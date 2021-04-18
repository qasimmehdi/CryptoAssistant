/* eslint-disable dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, BackHandler, View } from "react-native";
import { useDispatch } from "react-redux";
import { SInfoGet } from "../services/sensitiveStorage";
import { loginStyles } from "../styles/loginStyles";
import Loading from "./SplashScreen";
import * as Actions from "../store/actions";
import axios from "axios";
import TouchID from "react-native-touch-id";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const optionalConfigObject = {
    title: "Authentication Required", // Android
    imageColor: "#ffffff", // Android
    imageErrorColor: "#ff0000", // Android
    sensorDescription: "Touch sensor", // Android
    sensorErrorDescription: "Failed", // Android
    cancelText: "Cancel", // Android
    fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    SInfoGet("auth_token")
      .then((resp) => {
        console.log("token", resp);
        if (resp != null) {
          SInfoGet("touch_id")
            .then((res) => {
              if (parseInt(res)) {
                dispatch(Actions.token({ token: resp }));
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + resp;
                TouchID.authenticate(
                  "Fingerprint authentication is required.",
                  optionalConfigObject
                )
                  .then(() => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                      })
                    );
                  })
                  .catch(() => {
                    Alert.alert(
                      "Authentication Failed",
                      "",
                      [
                        {
                          text: "OK",
                          onPress: () => BackHandler.exitApp(),
                        },
                      ],
                      { cancelable: false }
                    );
                  });
              } else {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Dashboard" }],
                  })
                );
              }
            })
            .catch(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Dashboard" }],
                })
              );
            });
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "SigninOrRegister" }],
            })
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={loginStyles.body}>
      <Loading />
    </View>
  );
};
export default StartupScreen;
