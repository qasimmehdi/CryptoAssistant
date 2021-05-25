import { Button, Text, Toast } from "galio-framework";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { COLOR } from "../shared/colors";
import Hr from "../shared/hr";
import { sharedStyles } from "../shared/shared.style";
import Loading from "../SplashScreen";

const OrdersRow = (props) => {
  const { base, quote, amount, price, time, side } = props;

  const cancel = () => {
    //cancel order
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text color={COLOR.WHITE} size={14}>
          {base}/{quote}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text color={COLOR.APP_GREY} size={12}>
            {"Side: "}
          </Text>
          <Text color={COLOR.WHITE} size={12}>
            {side}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text color={COLOR.APP_GREY} size={12}>
            {"Amount: "}
          </Text>
          <Text color={COLOR.WHITE} size={12}>
            {numeral(amount).format("0,0.0000")}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text color={COLOR.APP_GREY} size={12}>
            {"Price: "}
          </Text>
          <Text color={COLOR.WHITE} size={12}>
            {numeral(price).format("0,0.0000")}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text color={COLOR.APP_GREY} size={12}>
          {moment(time, "x").format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Button
          radius={4}
          style={{ width: 70, height: 26 }}
          color={COLOR.APP_GREY}
          onPress={cancel}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default function OpenOders() {
  const [orders, setOrders] = useState([
    {
      base: "BTC",
      quote: "USDT",
      amount: 1.5,
      price: 40000,
      time: 1621964067000,
      side: "Buy",
    },
  ]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    //get Data
  }, []);

  return (
    <View style={sharedStyles.body}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Loading />
        ) : (
          orders.map((order, i) => (
            <React.Fragment key={`order-${i}`}>
              <OrdersRow {...order} />
              <Hr color={COLOR.APP_GREY} />
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}
