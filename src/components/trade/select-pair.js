import { useIsFocused } from "@react-navigation/core";
import { Input, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import iconImages from "../../assets/coinIcons/names";
import { pairs } from "../../services/ccxt/pairs";
import { addCoinStyle } from "../add-favourite/AddCoin.style";
import { COLOR } from "../shared/colors";
import Hr from "../shared/hr";
import { sharedStyles } from "../shared/shared.style";
import Loading from "../SplashScreen";

const Row = (props) => {
  const icon = props.name.split("/")[0];
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(props.redirect, { pair: props.name });
        }}
      >
        <View style={addCoinStyle.row}>
          <View style={addCoinStyle.coinCell}>
            <Image
              style={addCoinStyle.coinIcon}
              source={
                iconImages.hasOwnProperty(icon)
                  ? iconImages[icon]
                  : iconImages.GENERIC
              }
            />
            <Text
              color={COLOR.WHITE}
              size={14}
              bold
              style={addCoinStyle.coinitem}
            >
              {}
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
  for (let i = 0; i <= 100 && i < props.data.length; i++) {
    rows.push(
      <Row
        key={i}
        name={props.data[i]}
        navigation={props.navigation}
        redirect={props.redirect}
      />
    );
  }
  return <React.Fragment>{rows}</React.Fragment>;
};

export default function SelectPair({ navigation, route }) {
  const [coin, setCoin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoSymbols, setCryptoSymbols] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      var a = pairs.find(
        (i) => i.exchange.toLowerCase() === route.params.exchange.toLowerCase()
      ).symbols;
      console.log(a);
      setCryptoSymbols(
        pairs.find(
          (i) =>
            i.exchange.toLowerCase() === route.params.exchange.toLowerCase()
        ).symbols
      );
      setSymbols(
        pairs.find(
          (i) =>
            i.exchange.toLowerCase() === route.params.exchange.toLowerCase()
        ).symbols
      );
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      coin && onChangeSearch(coin);
    }, 500);

    return () => clearTimeout(id);
  }, [coin]);

  const onChangeSearch = async (text) => {
    setIsLoading(true);
    const temp = cryptoSymbols.filter((item) => {
      return (
        item.toLowerCase().indexOf(text.toString().toLowerCase()) > -1 ||
        text === ""
      );
    });
    setSymbols([...temp]);
    setIsLoading(false);
  };

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
        {isLoading ? (
          <Loading />
        ) : (
          <RenderList
            data={symbols}
            navigation={navigation}
            redirect={route.params.redirect}
          />
        )}
      </ScrollView>
    </View>
  );
}
