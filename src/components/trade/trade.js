import { useIsFocused } from "@react-navigation/native";
import { Button, Input, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import * as Actions from "../../store/actions";
import LinearGradient from "react-native-linear-gradient";
import { transactionStyles } from "../transaction/add-transaction.style";
import { styles } from "./trade.style";
import CCXT from "../../services/ccxt/react-ccxt";
import { ScrollView } from "react-native-gesture-handler";
import numeral from "numeral";
import { regexes } from "../shared/regexes";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";

export default function TradingScreen({ navigation, route, tabNav }) {
  const name = route?.params?.name;
  console.log(name);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [buyBtnColor, setBuyBtnColor] = useState(COLOR.BUY);
  const [sellBtnColor, setSellBtnColor] = useState(COLOR.DISABLED);
  const [exchange, setExchange] = useState("");
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState("");
  const [side, setSide] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (isFocused) {
      setExchange(route?.params?.name || "");
      setPair(route?.params?.pair || "");
    }
  }, [isFocused]);

  useEffect(() => {
    const temp = numeral(parseFloat(price) * parseFloat(quantity)).format(
      "0[.][0000]"
    );
    setTotal(temp);
  }, [price, quantity]);

  useEffect(() => {
    if (exchange && pair && price && side && quantity) {
      setBtnDisable(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setBtnDisable(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [price, quantity, exchange, pair, side]);

  const initiateOrder = () => {
    const ccxt = new CCXT();
    ccxt
      .createOrder(
        exchange,
        pair,
        side,
        parseFloat(quantity),
        parseFloat(price)
      )
      .then((x) => {
        Alert.alert("Success", String(x));
      })
      .catch((err) => {
        Alert.alert("Error", String(err));
      });
  };

  const changeTitle = (title) => {
    return dispatch(Actions.Header({ title: title }));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle("Trade");
      tabNav.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TradeBot");
              console.log("object");
            }}
          >
            <FontAwesome5
              name={"robot"}
              size={25}
              color={COLOR.WHITE}
              style={{
                paddingRight: 5,
                display: "flex",
                justifyContent: "center",
              }}
            />
          </TouchableOpacity>
        ),
      });
    }

    return () =>
      tabNav.setOptions({
        headerRight: null,
      });
  }, [isFocused]);
  return (
    <View style={sharedStyles.body}>
      <ScrollView>
        <View style={transactionStyles.formFields}>
          <View style={styles.row}>
            <Button
              color={buyBtnColor}
              style={styles.buysellbtn}
              onPress={() => {
                setSide("Buy");
                setBuyBtnColor(COLOR.BUY);
                setSellBtnColor(COLOR.DISABLED);
              }}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Buy
              </Text>
            </Button>

            <Button
              color={sellBtnColor}
              style={styles.buysellbtn}
              onPress={() => {
                setSide("Sell");
                setBuyBtnColor(COLOR.DISABLED);
                setSellBtnColor(COLOR.SELL);
              }}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Sell
              </Text>
            </Button>
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Exchange
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SelectExchangeList", { redirect: "Trade" })
              }
            >
              <Input
                style={transactionStyles.input}
                textAlign={"right"}
                placeholder="Exchange"
                placeholderTextColor={COLOR.APP_GREY}
                iconColor={COLOR.APP_GREY}
                color={COLOR.WHITE}
                editable={false}
                value={exchange}
              />
            </TouchableOpacity>
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Pair
            </Text>
            <TouchableOpacity
              disabled={!exchange}
              onPress={() =>
                navigation.navigate("SelectPair", {
                  redirect: "Trade",
                  exchange,
                })
              }
            >
              <Input
                style={transactionStyles.input}
                textAlign={"right"}
                placeholder="Pair"
                placeholderTextColor={COLOR.APP_GREY}
                iconColor={COLOR.APP_GREY}
                color={COLOR.WHITE}
                value={pair}
                editable={false}
                disabled={!exchange}
              />
            </TouchableOpacity>
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Price
            </Text>
            <Input
              style={transactionStyles.input}
              placeholder={`Price ${
                pair.split("/")[1] ? `(${pair.split("/")[1]})` : "( )"
              }`}
              textAlign={"right"}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={price}
              onChangeText={(text) => setPrice(text.replace(regexes.float, ""))}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Quantity
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={"right"}
              placeholder={`Quantity ${
                pair.split("/")[0] ? `(${pair.split("/")[0]})` : "( )"
              }`}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={quantity}
              onChangeText={(text) =>
                setQuantity(text.replace(regexes.float, ""))
              }
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Total
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={"right"}
              placeholder={`Total (${pair.split("/")[1]})`}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={total}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: 5, marginBottom: 20 }}>
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
            disabled={btnDisable}
            onPress={() => {
              initiateOrder();
            }}
          >
            <Text color={COLOR.WHITE} h5 bold>
              {`${side} ${pair.split("/")[0]}`}
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
