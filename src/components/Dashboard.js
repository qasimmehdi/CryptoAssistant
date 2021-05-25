import { useIsFocused } from "@react-navigation/native";
import { Button, Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/dist/MaterialIcons";
import { useDispatch } from "react-redux";
import { getFavourites } from "../db/methods";
import CCXT from "../services/ccxt/react-ccxt";
import * as Actions from "../store/actions";
import { dashboardStyles } from "../styles/dashboardStyles";
import Row from "./dashboard.row";
import { COLOR } from "./shared/colors";
import Hr from "./shared/hr";
import { sharedStyles } from "./shared/shared.style";
import Loading from "./SplashScreen";

function Dashboard({ navigation }) {
  const isFocused = useIsFocused();
  const ccxt = new CCXT();
  const [balance, setbalance] = useState(0.0);
  const [coinsData, setCoinsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const onClickCoin = (coin) => {
    return dispatch(Actions.setSelectedCoin({ base: coin, quote: "USD" }));
  };
  const changeTitle = (title) => {
    return dispatch(Actions.Header({ title: title }));
  };

  function updateTable(data, tempArray) {
    console.log("updateTable", data);
    console.log("updateTable coinsData", tempArray);
    let tempCoinsData = tempArray;
    for (let i = 0; i < tempCoinsData.length; i++) {
      let pair = `${tempCoinsData[i].name}-USD`;
      console.log(pair);
      tempCoinsData[i].price = numeral(data[pair].last).format("$0,0.0[0000]");
      tempCoinsData[i].priceChange = numeral(data[pair].change).format(
        "+0,0.0[0000]"
      );
    }
    console.log("updateTable", tempCoinsData);
    return tempCoinsData;
  }

  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle("Crypto Assistant");
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      let tempArray = [];
      getFavourites()
        .then((resp) => {
          const len = resp.length;
          console.log("dashboard get favourites", resp);
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < resp[i].rows.length; j++) {
              let item = resp[i].rows.item(j);
              console.log(item);
              tempArray.push({
                name: item.base,
                quote: item.quote,
                price:
                  numeral(coinsData[j]?.price || 0).format("$0,0.0[0000]") || "0",  //CASTING STRING TO NUMBER
                priceChange:
                  numeral(coinsData[j]?.priceChange || 0).format("$0,0.0[0000]") ||
                  "0",
                changePercentage: "0",
                holdingConverted: "0",
                holdingUnits: item.balance,
                notification: item.notification === "1" ? true : false,
                balance: parseFloat(item.balance) > 0 ? true : false,
              });
            }
          }
          console.log("tempArray", tempArray);
          setCoinsData([...tempArray]);
          let favPairs = tempArray.map((i) => `${i.name}/${i.quote}`);
          ccxt
            .coinDetails(favPairs)
            .then((resp2) => {
              console.log("resp", resp2);
              setCoinsData([...updateTable(resp2, tempArray)]);  //SETTING COIN DATA IN STATE
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [isFocused]);

  useEffect(() => {
    setIsLoading(true);
    let tempArray = [];
    getFavourites()
      .then((resp) => {
        const len = resp.length;
        console.log("dashboard get favourites", resp);
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < resp[i].rows.length; j++) {
            let item = resp[i].rows.item(j);
            console.log(item);
            tempArray.push({
              name: item.base,
              quote: item.quote,
              price: "0",
              priceChange: "0",
              changePercentage: "0",
              holdingConverted: "0",
              holdingUnits: item.balance,
              notification: item.notification === "1" ? true : false,
              balance: parseFloat(item.balance) > 0 ? true : false,
            });
          }
        }
        console.log("tempArray", tempArray);
        setCoinsData([...tempArray]);  //SETTING SATE TO REFLECT ON UI
        let favPairs = tempArray.map((i) => `${i.name}/${i.quote}`);
        ccxt
          .coinDetails(favPairs)
          .then((resp2) => {
            console.log("resp", resp2);
            setCoinsData([...updateTable(resp2, tempArray)]);  //SETTING SATE TO REFLECT ON UI
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);  //CONDITIONALLY LOADING
          });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isFocused) {
      getBalance();
    }
  }, [isFocused]);

  const getBalance = async () => {
    let balances = await ccxt.GetHoldings();
    if (balances.length > 0) {
      let total = balances.reduce(function (a, b) {
        // function(previousValue, currentValue)
        return { amount: parseFloat(a.amount) + parseFloat(b.amount) }; //select age in object array;
      });
      setbalance(total.amount);
      console.log("total Balance", total);
    }
  };

  const onRefresh = React.useCallback(() => { //PULL TO REFERESH IMPLEMENTATION
    setRefresh(true);
    console.log("refreshing", coinsData);
    let favPairs = coinsData.map((i) => `${i.name}/USD`);
    ccxt
      .coinDetails(favPairs)   //GETTING FAV PAIRS FROM DB AND QUERYING CCXT FOR THEIR RATES
      .then((resp) => {
        console.log("resp", resp);
        setCoinsData([...updateTable(resp, coinsData)]);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefresh(false));
  }, [coinsData]);

  return (
    <View style={dashboardStyles.body}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PNL");
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={dashboardStyles.linearGradient}
        >
          <View style={dashboardStyles.topCard}>
            <View style={dashboardStyles.leftView}>
              <Text color={COLOR.WHITE} h5 style={dashboardStyles.topCardText}>
                Main Portfolio
              </Text>
              <Text
                color={COLOR.WHITE}
                h4
                bold
                style={dashboardStyles.topCardText}
              >
                ${`${balance.toFixed(2)}`}
              </Text>
            </View>
            <View style={dashboardStyles.rightView}>
              <Text
                color={COLOR.WHITE}
                h6
                style={{ ...dashboardStyles.topCardText, textAlign: "right" }}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={dashboardStyles.container}>
        <View style={dashboardStyles.thead}>
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadCoin}
          >
            COIN
          </Text>
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadPrice}
          >
            PRICE
          </Text>
          {/* <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" /> */}
          <Text
            color={COLOR.APP_GREY}
            size={12}
            bold
            style={dashboardStyles.theadHoldings}
          >
            HOLDINGS
          </Text>
          {/* <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" /> */}

          <Icon
            name="notifications"
            color={COLOR.APP_GREY}
            style={dashboardStyles.theadBell}
          />
        </View>
        <Hr color={COLOR.APP_GREY} />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <Loading />
          ) : (
            <View>
              {coinsData.map((coin, i) => (
                <TouchableOpacity
                  key={coin.name}
                  onPress={() => {
                    onClickCoin(coin.name);
                    navigation.navigate("CoinPageTabNav", {
                      base: coinsData[i].name,
                      price: coinsData[i].price,
                      priceChange: coinsData[i].priceChange,
                    });
                  }}
                >
                  <Row
                    name={coin.name}
                    price={coin.price}
                    priceChange={coin.priceChange}
                    holdingConverted={coin.holdingConverted}
                    holdingUnits={coin.holdingUnits}
                    notification={coin.notification}
                    balance={coin.balance}
                    navigation={navigation}
                    quote={coin.quote}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
          style={{ ...sharedStyles.linearGradient, marginTop: 5 }}
        >
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            onPress={() => navigation.navigate("Add Coin")}
          >
            <Text color={COLOR.WHITE} h5 bold>
              Add More
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}

export default Dashboard;
