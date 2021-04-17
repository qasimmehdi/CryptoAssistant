/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Text } from "galio-framework";
import React, { Suspense, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import { addCoinStyle } from "./AddCoin.style";
import * as crypto from "cryptocurrencies";
import Hr from "../shared/hr";
import iconImages from "../../assets/coinIcons/names";
import { Image } from "react-native";
import Loading from "../SplashScreen";
import { TouchableOpacity } from "react-native";
import { saveFavourites } from "../../db/methods";
import { useIsFocused } from "@react-navigation/native";

const Row = (props) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          saveFavourites("binance", props.name, "USD", "0", "0");
          props.navigation.navigate("Dashboard");
        }}
      >
        <View style={addCoinStyle.row}>
          <View style={addCoinStyle.coinCell}>
            <Image
              style={addCoinStyle.coinIcon}
              source={
                iconImages.hasOwnProperty(props.name)
                  ? iconImages[props.name]
                  : iconImages.GENERIC
              }
            />
            <Text
              color={COLOR.WHITE}
              size={14}
              bold
              style={addCoinStyle.coinitem}
            >
              {crypto[props.name]}
            </Text>
            <Text
              color={COLOR.APP_GREY}
              size={14}
              bold
              style={{ ...addCoinStyle.coinitem, paddingLeft: 5 }}
            >
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Hr color={COLOR.APP_GREY} />
    </React.Fragment>
  );
};

const RenderList = (props) => {
  let rows = [];
  for (let i = 0; i <= 100 && i < props.data.length; i++) { //loop for rendering all list present in local storage
    rows.push(
      <Row key={i} name={props.data[i]} navigation={props.navigation} />
    );
  }
  return <React.Fragment>{rows}</React.Fragment>;
};

export default function AddCoin({ navigation }) {
  const [coin, setCoin] = useState("");
  const cryptoSymbols = [...crypto.symbols()];
  const [symbols, setSymbols] = useState([...cryptoSymbols]);

  useEffect(() => {   //it will run every time the screen renders
    const id = setTimeout(() => {
      onChangeSearch(coin);
    }, 500);

    return () => clearTimeout(id);
  }, [coin]);

  const onChangeSearch = (text) => {
    const temp = cryptoSymbols.filter((item) => {
      return (
        item.toLowerCase().indexOf(text.toString().toLowerCase()) > -1 ||
        text === ""
      );
    });
    setSymbols([...temp]);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      setCoin("");
    }
  }, [isFocused]);

  return (
    <View style={sharedStyles.body}>
      <Input
        style={addCoinStyle.input}
        placeholder="Search"
        placeholderTextColor={COLOR.APP_GREY}
        value={coin}
        onChangeText={setCoin}
        color={COLOR.WHITE}
      />
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <Suspense fallback={<Loading />}>
          <RenderList data={symbols} navigation={navigation} />
        </Suspense>
      </ScrollView>
    </View>
  );
}
