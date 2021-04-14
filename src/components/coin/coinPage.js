import { useIsFocused } from "@react-navigation/core";
import { Button, Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import CCXT from "../../services/ccxt/react-ccxt";
import Graph from "../Graph";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import Loading from "../SplashScreen";
import { coinPageStyles } from "./coinPageStyle";

export default function CoinPage({ navigation, route }) {
  const coinPageTitle = useSelector((state) => state.setSelectedCoin.base);
  let ccxt = new CCXT();
  const [graphData, setGraphData] = useState(null);
  const [price, setPrice] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({ title: coinPageTitle });
    let isMounted = true;
    setIsLoading(true);
    ccxt
      .Candles(`${coinPageTitle}/USD`, "1m")
      .then((resp) => {
        console.log(resp);
        /* let tempData = [];
        resp.forEach(i => {
          tempData.push({time: i[0] / 1000, value: i[4]});
        }); */
        const tempData = resp.map((i) => ({ time: i[0] / 1000, value: i[4] }));
        if (isMounted) {
          setPrice(tempData[tempData.length - 1].value);
          setGraphData(tempData);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    ccxt
      .coinDetails([route.params.base + "/USD"])
      .then((resp) => {
        console.log("resp", resp);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isFocused) {
      setPrice(route?.params?.price || "");
      setPriceChange(route?.params?.priceChange || "");
      console.log("route?.params", route?.params);
    }
  }, [isFocused]);

  return (
    <View style={coinPageStyles.body}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Text color={COLOR.WHITE} h3 bold>
          {numeral(price).format("$0,0.[00]")}
        </Text>
        <Text
          color={priceChange?.includes("-") ? COLOR.RED : COLOR.GREEN}
          h5
          bold
        >
          {numeral(priceChange).format("0,0.[00]%")}
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        {isLoading ? (
          <Loading />
        ) : (
          graphData && <Graph graphData={graphData} symbol={coinPageTitle} />
        )}
      </View>
      <View style={{ padding: 10, flex: 1 }}>
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
            onPress={() => navigation.navigate("AIPredictionChart")}
          >
            <Text color={COLOR.WHITE} h5 bold>
              AI Coin chart predictor
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
}
