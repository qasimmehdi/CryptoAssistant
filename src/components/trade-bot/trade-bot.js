import { useIsFocused } from "@react-navigation/native";
import { Button, Input, Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../shared/colors";
import { regexes } from "../shared/regexes";
import { sharedStyles } from "../shared/shared.style";
import { styles } from "../trade/trade.style";
import { transactionStyles } from "../transaction/add-transaction.style";
import { pairs } from "../../services/ccxt/pairs";
import { getExchange } from "../../db/methods";
import CCXT from "../../services/ccxt/react-ccxt";

export default function TradeBotScreen({ navigation, route }) {
  const name = route?.params?.name;
  console.log(name);
  const isFocused = useIsFocused();
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [buyBtnColor, setBuyBtnColor] = useState(COLOR.BUY);
  const [sellBtnColor, setSellBtnColor] = useState(COLOR.DISABLED);
  const [exchange, setExchange] = useState("");
  const [pair, setPair] = useState("");
  const [side, setSide] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [total, setTotal] = useState("");
  const [stop, setStop] = useState("");
  const [limit, setLimit] = useState("");
  const [percentage, setPercentage] = useState("");
  const [limitInterval,setLimitInterval] = useState(null);
  const ccxtObj = new CCXT();
  const [stopPercenChange,setstopPercenChange] = useState(null);

  //pair rate for limit
  useEffect(() => {
    let interval = UpdateLimit();
    if(interval){
      setLimitInterval(interval);
    }
  },[pair])

  //for stop to percentage
  useEffect(() => {  //SETTING PERCENTAGE OR STOP BIDIRECTIONAL
    if(stopPercenChange !== null){
      if(stopPercenChange === 1 && limit){
        let percDiff = ""+ (100 * Math.abs( (+limit - +stop) / ( (+limit + +stop)/2 ) )).toFixed(5);
        setPercentage(percDiff);
      }
      if(stopPercenChange === 2 && limit){  //IF NULL RESET 
        let stop = ""+ (+limit - (parseInt(percentage) / 100) * +limit).toFixed(5);
          setStop(stop);
      }
      if(stopPercenChange === 11){ //for empty values
        setPercentage("");
      }
      if(stopPercenChange === 22){  //IF NULL RESET
        setStop("");
      }
    }
    
  },[limit,stopPercenChange,stop,percentage])


  const UpdateLimit = async () => {  //GETTING LIMIT PRICE EVERY 5 sec
    const intervelId = setInterval(async function() {
      if(pair){
        let rate = await ccxtObj.coinDetails([route.params.pair]); 
  
        let isNotFound = Object.keys(rate).findIndex(x => x.toLowerCase() === 'not found');
  
        if(isNotFound < 0){  //CHECKING IF DATA AVAILABLE
          let finalRate = rate[route.params.pair.replace("/", "-")]["last"];
          setLimit(""+finalRate);
          const temp = numeral(parseFloat(finalRate) * parseFloat(quantity === "" ? 0 : quantity)).format(
            "0[.][0000]"
          );
          setTotal(temp);
        }
        
      }
    },5000);
    return intervelId;
  }


  useEffect(() => {
    if (isFocused) {
      setExchange(route?.params?.name || "");
      setPair(route?.params?.pair || "");
    }
    else{
      clearInterval(limitInterval);
    }
  }, [isFocused]);

  useEffect(() => {
    const temp = numeral(parseFloat(limit) * parseFloat(quantity)).format(
      "0[.][0000]"
    );
    setTotal(temp);
  }, [limit, quantity]);

  useEffect(() => {
    if (exchange && pair && side && quantity && stop && limit && percentage) { //VALIDATION ALL FIELDS MANDATORY
      setBtnDisable(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setBtnDisable(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [quantity, exchange, pair, side, stop, limit, percentage]);

  const startBot = async () => {   //STARTING BOT AND SENDING DATA TO NEXT SCREEEN
    //for exchange is avaialble or not
    if(stop > limit){  //VALIDATION FOR START BOOT
        Alert.alert("Invalid Input","Please enter stop less than limit");
        return;
    }

    const isExchangeAvaialble = pairs.findIndex(
      (x) => x.exchange.toLowerCase() === exchange.toLowerCase()
    );
    let balance = 0;
    if (isExchangeAvaialble > -1) {
      //for exchange keys available
      const resp = await getExchange(exchange);  //GETTING EXCHANGE OBJECT FROM CCXT
      console.log("bot", resp);
      if (resp[0].rows.length > 0) {
        //for pair is supported or not
        const isPairAvailable = pairs[isExchangeAvaialble].symbols.findIndex(  //CHECKING THE PAIR IS SUPPORTED IN EXCHANGE
          (x) => x === pair
        );
        if (isPairAvailable < 0) {
          Alert.alert(
            "Pair Not Found",
            `Currently ${exchange} doesn't support market pair ${pair}`
          );
          return;
        } else {
          //fetching balance
          balance = ccxtObj.fetchBalancesByExchange(exchange);
        }
      } else {
        Alert.alert("Keys Not Found", `Please add API keys for ${exchange}`);
        return;
      }
    } else {
      Alert.alert(
        "Exchange Not Found",
        "Currently Application not support exchange"
      );
      return;
    }

    if (balance <= 0) {
      Alert.alert("Balance Error", `Insufficient balance`);
      return;
    }

    navigation.navigate("TradeBotStarted", {
      quantity,
      exchange,
      pair,
      side,
      stop,
      limit,
      percentage,
    });
  };

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
                navigation.navigate("SelectExchangeList", {
                  redirect: "TradeBot",
                })
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
                  redirect: "TradeBot",
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
              Stop
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
              value={stop}
              onChangeText={(text) => {
                setStop(text.replace(regexes.float, ""));
                setstopPercenChange(text === "" ? 11 : 1);
              }}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Limit
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
              value={limit}
              editable={false}
              disabled={true}
              onChangeText={(text) => setLimit(text.replace(regexes.float, ""))}
            />
          </View>
          <View style={transactionStyles.field}>
            <Text
              style={transactionStyles.fieldText}
              bold
              color={COLOR.APP_GREY}
            >
              Trailing Stop %
            </Text>
            <Input
              style={transactionStyles.input}
              textAlign={"right"}
              placeholder={"%"}
              type="decimal-pad"
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={percentage}
              onChangeText={(text) =>{
                setPercentage(text.replace(regexes.float, ""));
                setstopPercenChange(text === "" ? 22 : 2);
              }
            }
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
              editable={false}
              disabled={true}
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
            onPress={startBot}
          >
            <Text color={COLOR.WHITE} h5 bold>
              Start Bot
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
