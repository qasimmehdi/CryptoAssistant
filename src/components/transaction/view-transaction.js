/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Text } from "galio-framework";
import { View } from "react-native";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import { getAllTransactions } from "../../db/methods";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import numeral from "numeral";
import moment from "moment";
import Hr from "../shared/hr";

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const base = useSelector((state) => state.setSelectedCoin.base);

  useEffect(() => {
    console.log("trnsa");
    getAllTransactions(base) //GETTING TRANSACTION FROM DB
      .then((resp) => {
        let tempArray = [];
        const len = resp.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < resp[i].rows.length; j++) {
            let item = resp[i].rows.item(j);
            console.log(item);
            tempArray.push(item);
          }
        }
        console.log(tempArray);
        setTransactions([...tempArray]); //SETTING STATE
        console.log(tempArray.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={sharedStyles.body}>
      <ScrollView indicatorStyle="white">
        {transactions.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "column",
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text color={COLOR.WHITE} size={12} bold>
                {item.type} via {item.exchange}
              </Text>
              <Text color={COLOR.WHITE} size={12} bold>
                {numeral(item.quantity).format("0,0[.][0000]") +
                  " " +
                  item.base}
              </Text>
            </View>
            <Text color={COLOR.APP_GREY} size={10}>
              {moment(item.date, "x").format("YYYY-MM-DD HH:mm:ss")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text color={COLOR.APP_GREY} size={10}>
                  Trading Pair
                </Text>
                <Text color={COLOR.WHITE} size={12} bold>
                  {item.base + "/" + item.quote}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  color={COLOR.APP_GREY}
                  size={10}
                  style={{ textAlign: "right" }}
                >
                  Price
                </Text>
                <Text color={COLOR.WHITE} size={12} bold>
                  {numeral(item.price).format("0,0[.][0000]") +
                    " " +
                    item.quote}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text color={COLOR.APP_GREY} size={10}>
                  Fee
                </Text>
                <Text color={COLOR.WHITE} size={12} bold>
                  {item.fee || "0"}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  color={COLOR.APP_GREY}
                  size={10}
                  style={{ textAlign: "right" }}
                >
                  Total Cost
                </Text>
                <Text color={COLOR.WHITE} size={12} bold>
                  {numeral(
                    parseFloat(item.price) * parseFloat(item.quantity) +
                      (parseFloat(item.fee) || 0)
                  ).format("0,0[.][0000]") +
                    " " +
                    item.quote}
                </Text>
              </View>
            </View>
            <Hr color={COLOR.APP_GREY} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
