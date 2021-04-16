import { Button, Input, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../shared/colors";
import CustomInput from "../shared/NewCustomInput";
import { regexes } from "../shared/regexes";
import { sharedStyles } from "../shared/shared.style";
import { settingsStyle } from "./Settings.style";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [passV, setPassV] = useState(false);
  const [pass2V, setPass2V] = useState(false);
  const [error, setError] = useState("");

  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (password && confirmPassword && currentPassword && passV && pass2V) {
      if (password === confirmPassword) {
        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
        setBtnDisabled(false);
        setError("");
      } else {
        setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
        setBtnDisabled(true);
        setError("Passwords donot match");
      }
    }
  }, [password, confirmPassword, currentPassword, passV, pass2V]);

  return (
    <View style={sharedStyles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, flexDirection: "column", display: "flex" }}
      >
        <View style={settingsStyle.topPart}>
          <View style={{ paddingBottom: 20 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Current Password
            </Text>
            <Input
              style={settingsStyle.input}
              placeholder="Current Password"
              password
              viewPass
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Password
            </Text>
            <CustomInput
              style={settingsStyle.input}
              password
              viewPass
              placeholder="Password"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={password}
              onChangeText={setPassword}
              validations={[
                {
                  regex: regexes.password,
                  errMsg: "Min 8 characters are required",
                },
              ]}
              onValidation={(isValid) => setPassV(isValid)}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Confirm Password
            </Text>
            <CustomInput
              style={settingsStyle.input}
              password
              viewPass
              placeholder="Password"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              validations={[
                {
                  regex: regexes.password,
                  errMsg: "Min 8 characters are required",
                },
              ]}
              onValidation={(isValid) => setPass2V(isValid)}
            />
            <Text size={10} color={COLOR.RED}>
              {error}
            </Text>
          </View>
        </View>
        <View style={settingsStyle.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradientColors}
            style={sharedStyles.linearGradient}
          >
            <Button
              round
              color="transparent"
              style={sharedStyles.borderless}
              onPress={() => {}}
              disabled={btnDisabled}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Change password
              </Text>
            </Button>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
