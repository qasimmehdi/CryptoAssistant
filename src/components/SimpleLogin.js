import { CommonActions } from "@react-navigation/native";
import { Button, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Alert, TouchableHighlight, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { loginUser } from "../services/auth";
import { loginStyles } from "../styles/loginStyles";
import { COLOR } from "./shared/colors";
import CustomInput from "./shared/NewCustomInput";
import { regexes } from "./shared/regexes";
import Loading from "./SplashScreen";

function LoginForm({ navigation }) {
  const [user, onChangeUser] = useState("");
  const [pass, onChangePass] = useState("");
  const [progress, onChangeProgress] = useState(false);
  const [disableSigin, setDisableSignin] = useState(true);
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [userV, setUserV] = useState(false);
  const [passV, setPassV] = useState(false);

  useEffect(() => {
    if (userV && passV) {
      setDisableSignin(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setDisableSignin(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [userV, passV]);

  return (
    <View style={loginStyles.body}>
      {progress ? (
        <Loading />
      ) : (
        <>
          <View style={loginStyles.centerForm}>
            <View style={loginStyles.sectionContainer}>
              <CustomInput
                style={loginStyles.input}
                type="email-address"
                placeholder="Email address or username"
                placeholderTextColor={COLOR.APP_GREY}
                value={user}
                onChangeText={onChangeUser}
                validations={[
                  {
                    regex: regexes.required,
                    errMsg: "Required",
                  },
                ]}
                onValidation={(isValid) => setUserV(isValid)}
                color={COLOR.WHITE}
              />
              <CustomInput
                style={loginStyles.input}
                placeholder="Password"
                placeholderTextColor={COLOR.APP_GREY}
                password
                viewPass
                iconColor={COLOR.APP_GREY}
                color={COLOR.WHITE}
                value={pass}
                onChangeText={onChangePass}
                validations={[
                  {
                    regex: regexes.required,
                    errMsg: "Required",
                  },
                ]}
                onValidation={(isValid) => setPassV(isValid)}
              />
            </View>
            <TouchableHighlight
              style={loginStyles.forgotPassword}
              onPress={() => navigation.navigate("ForgetEnterEmail")}
            >
              <Text color={COLOR.APP_GREY} size={11} bold>
                Forgot Password?
              </Text>
            </TouchableHighlight>
          </View>
          <View style={loginStyles.button}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={gradientColors}
              style={loginStyles.linearGradient}
            >
              <Button
                round
                color="transparent"
                style={loginStyles.borderless}
                disabled={disableSigin}
                onPress={async () => {
                  onChangeProgress(true);
                  if (await loginUser(user, pass)) {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                      })
                    );
                  } else {
                    onChangeProgress(false);
                    Alert.alert("Login Unsuccessful");
                  }
                }}
              >
                <Text color={COLOR.WHITE} h5 bold>
                  Sign In
                </Text>
              </Button>
            </LinearGradient>
          </View>
        </>
      )}
    </View>
  );
}

export default LoginForm;
