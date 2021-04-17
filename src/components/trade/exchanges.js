/* eslint-disable react-native/no-inline-styles */
import { Button, Text } from "galio-framework";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import Hr from "../shared/hr";
import { styles } from "./connect-exchange.style";
import { ScrollView } from "react-native";
import CCXT from "../../services/ccxt/react-ccxt";
import iconImages from "../../assets/coinIcons/names";
import { getAllExchanges } from "../../db/methods";
import LinearGradient from "react-native-linear-gradient";

const ExchangeRow = (props) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(props.redirect, {
            name: props.name,
          });
        }}
      >
        <View style={styles.row}>
          <View style={styles.coinCell}>
            <Image
              style={styles.exchangeIcon}
              source={{ uri: props.logo ? props.logo : iconImages.GENERIC }}
            />
            <Text color={COLOR.WHITE} size={14} bold style={styles.coinitem}>
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Hr color={COLOR.APP_GREY} />
    </React.Fragment>
  );
};

export default function SelectExchangeList({ navigation, route }) {
  const [exchanges, setExchanges] = React.useState([]);

  useEffect(() => {
    getAllExchanges()   //GETTING ALL EXCHNAGES USING CCXT SERVICE
      .then((resp) => {
        console.log(resp);
        let tempArray = [];
        const len = resp.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < resp[i].rows.length; j++) {
            let item = resp[i].rows.item(j);
            tempArray.push(item.exchange);
          }
        }
        console.log(tempArray);
        const temp = new CCXT().getAllExchangeAndLogo();
        const filteredArray = temp.filter((value) =>
          tempArray.includes(value.name.toLowerCase())
        );
        setExchanges(filteredArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={sharedStyles.body}>
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <Hr color={COLOR.APP_GREY} />
        {exchanges.map((x, i) => (
          <ExchangeRow
            key={i}
            navigation={navigation}
            name={x.name}
            logo={x.logo}
            redirect={route?.params?.redirect}
          />
        ))}
      </ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
        style={{ ...sharedStyles.linearGradient, marginBottom: 10 }}
      >
        <Button
          round
          color="transparent"
          style={sharedStyles.borderless}
          onPress={() => {
            navigation.navigate("ExchangeList");
          }}
        >
          <Text color={COLOR.WHITE} h5 bold>
            Connect Exchange
          </Text>
        </Button>
      </LinearGradient>
    </View>
  );
}
