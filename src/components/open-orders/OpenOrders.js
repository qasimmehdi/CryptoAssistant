import { Button, Text, Toast } from "galio-framework";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View,Alert } from "react-native";
import { COLOR } from "../shared/colors";
import Hr from "../shared/hr";
import { sharedStyles } from "../shared/shared.style";
import Loading from "../SplashScreen";
import CCXT from "../../services/ccxt/react-ccxt";

const OrdersRow = (props) => {
  const { symbol, amount, price, timestamp, side,remove } = props;

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
          {symbol}
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
            {side[0].toUpperCase() + side.slice(1)}
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
          {moment(timestamp, "x").format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Button
          radius={4}
          style={{ width: 70, height: 26 }}
          color={COLOR.APP_GREY}
          onPress={remove}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default function OpenOders() {
  const ccxt = new CCXT();

  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    //get Data
    setisLoading(true);
    ccxt.getOpenOrders().then(orders => {
      const AllOrders = [].concat.apply([], orders);
      console.log("openOrders",AllOrders);
      setOrders(AllOrders);
      if(AllOrders.length <= 0){
        Alert.alert("Error","No Open Orders Found");
      }
    }).catch(err => console.log("Unable to fetch orders"))
    .finally(() => setisLoading(false));
    
  }, []);


  const cancelOrder = (id,symbol) => {
    console.log(id);
    console.log(symbol);
    setisLoading(true);
    ccxt.cancelOrder(id,symbol).then(x => {
      setOrders(orders.filter(item => item.info.orderId !== id));
      Alert.alert("Success","Order Cancelled");
    })
    .catch(err => {
      Alert.alert("Error","Unable to cancel order");
    })
    .finally(() => setisLoading(false));
  }

  return (
    <View style={sharedStyles.body}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Loading />
        ) : (
          orders.map((order, i) => (
            <React.Fragment key={`order-${i}`}>
              <OrdersRow {...order} remove={() => cancelOrder(order.info.orderId,order.symbol)}/>
              <Hr color={COLOR.APP_GREY} />
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}
