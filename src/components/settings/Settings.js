import { Button, Input, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../shared/colors";
import CustomInput from "../shared/NewCustomInput";
import { regexes } from "../shared/regexes";
import { sharedStyles } from "../shared/shared.style";
import { settingsStyle } from "./Settings.style";
import { getProfile, updateProfile } from "../../services/profile.services";

export default function Settings({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [emailV, setEmailV] = useState(false);

  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (firstName && lastName && email && emailV) {
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
      setBtnDisabled(false);
    } else {
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
      setBtnDisabled(true);
    }
  }, [firstName, lastName, email, emailV]);

  useEffect(() => {
    getProfile()
      .then((x) => {
        const data = x?.data;
        setFirstName(data?.firstName || "");
        setLastName(data?.lastName || "");
        setEmail(data?.email || "");
        setEmailV(data?.email ? true : false);
        setUserName(data?.userName || "");
      })
      .catch(() => Alert.alert("Error", "Unable to fetch profile"));
  }, []);

  const saveProfile = () => {
    setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    setBtnDisabled(true);
    const data = {
      firstName,
      lastName,
      email,
    };

    updateProfile(data)
      .then((x) => Alert.alert("Success", "Profile Updated Successfully"))
      .catch(() => Alert.alert("Error", "Something went wrong"))
      .finally(() => {
        setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
        setBtnDisabled(false);
      });
  };

  return (
    <View style={sharedStyles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, flexDirection: "column", display: "flex" }}
      >
        <View style={settingsStyle.topPart}>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              First name
            </Text>
            <Input
              style={settingsStyle.input}
              placeholder="First name"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Last name
            </Text>
            <Input
              style={settingsStyle.input}
              placeholder="Last name"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Username
            </Text>
            <Input
              style={settingsStyle.input}
              placeholder="Username"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              disabled={true}
              editable={false}
              value={userName}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Text bold color={COLOR.APP_GREY} style={{ paddingLeft: 5 }}>
              Email address
            </Text>
            <CustomInput
              style={settingsStyle.input}
              type="email-address"
              placeholder="Email address"
              placeholderTextColor={COLOR.APP_GREY}
              value={email}
              onChangeText={setEmail}
              validations={[
                {
                  regex: regexes.email,
                  errMsg: "Invalid email address",
                },
              ]}
              onValidation={(isValid) => setEmailV(isValid)}
              color={COLOR.WHITE}
            />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradientColors}
            style={{ ...sharedStyles.linearGradient, marginBottom: 10 }}
          >
            <Button
              round
              color="transparent"
              style={sharedStyles.borderless}
              onPress={saveProfile}
              disabled={btnDisabled}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Update Profile
              </Text>
            </Button>
          </LinearGradient>
        </View>
        <View style={settingsStyle.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
            style={sharedStyles.linearGradient}
          >
            <Button
              round
              color="transparent"
              style={sharedStyles.borderless}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Change Password
              </Text>
            </Button>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
