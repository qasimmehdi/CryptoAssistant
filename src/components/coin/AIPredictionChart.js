import { Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CCXT from "../../services/ccxt/react-ccxt";
import { getPrediction } from "../../services/user.services";
import Graph from "../Graph";
import { COLOR } from "../shared/colors";
import Loading from "../SplashScreen";
import { coinPageStyles } from "./coinPageStyle";

export default function AIPredictionChart({ navigation, route }) {
  const coinPageTitle = useSelector((state) => state.setSelectedCoin.base);
  const [graphData, setGraphData] = useState(null);
  const [price, setPrice] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  /* setPrice(route.params.price || ""); */
  const ccxt = new CCXT();

  useEffect(() => {
    navigation.setOptions({ title: coinPageTitle + " Prediction" });
    let isMounted = true;
    setIsLoading(true);

    getPrediction(coinPageTitle, "30") //Api call for prediction
      .then((resp) => {
        console.log(resp);
        let tempData = [];
        resp.data.forEach((i) => {
          tempData.push({ time: i.timestamp, value: i.prediction });
        });
        if (isMounted) {
          setGraphData(tempData);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false); //after response set the loader off
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    ccxt
      .coinDetails([coinPageTitle + "/USD"]) //getting details from coin
      .then((resp) => {
        console.log("resp", resp[`${coinPageTitle}-USD`]["last"]);
        setPrice(resp[`${coinPageTitle}-USD`]["last"]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={coinPageStyles.body}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Text color={COLOR.WHITE} h3 bold style={{ flex: 1, margin: 10 }}>
          {numeral(price).format("$0,0.[0000]")}
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        {isLoading ? (
          <Loading />
        ) : (
          graphData && <Graph graphData={graphData} symbol={coinPageTitle} />
        )}
      </View>
    </View>
  );
}
