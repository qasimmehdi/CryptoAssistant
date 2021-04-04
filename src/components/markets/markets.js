/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from "@react-navigation/native";
import { Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import * as Actions from "../../store/actions";
import { dashboardStyles } from "../../styles/dashboardStyles";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Hr from "../shared/hr";
import { styles } from "./markets.style";
import { ScrollView } from "react-native";
import MarketRow from "./market-rows";
import { TouchableOpacity } from "react-native";
import { getCoins } from "../../services/marketService";
import Loading from "../SplashScreen";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 0;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function MarketScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [coins, setcoins] = useState([]);
  const [limit, setlimit] = useState(20);
  const [isCalling, setisCalling] = useState(false);
  const dispatch = useDispatch();
  const changeTitle = (title) => {
    return dispatch(Actions.Header({ title: title }));
  };
  const onClickCoin = (coin) => {
    return dispatch(Actions.setSelectedCoin({ base: coin, quote: "USD" }));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    if (isFocused) {
      changeTitle("Markets");
    }
  }, [isFocused]);

  useEffect(() => {
    setisCalling(true);
    getCoins(limit)
      .then((result) => {
        setcoins(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisCalling(false);
      });
  }, [limit]);
  return (
    <View style={sharedStyles.body}>
      <View style={styles.thead}>
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadCoin}
        >
          Rank
        </Text>
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadPrice}
        >
          PRICE
        </Text>
        <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" />
        <Text
          color={COLOR.APP_GREY}
          size={12}
          bold
          style={dashboardStyles.theadHoldings}
        >
          CAP / VOL
        </Text>
        <EntypoIcon color={COLOR.APP_GREY} name="chevron-small-down" />
      </View>
      <Hr color={COLOR.APP_GREY} />
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (!isCalling) {
              setlimit((pr) => pr + 20);
            }
          }
        }}
        style={{ flex: 1 }}
      >
        {isCalling ? (
          <Loading />
        ) : (
          coins.map((res, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                onClickCoin(res?.symbol);
                navigation.navigate("CoinPageTabNav");
              }}
            >
              <MarketRow
                name={res?.symbol}
                price={"$" + res?.quote?.USD?.price.toFixed(0)}
                priceChange={
                  res?.quote?.USD?.percent_change_1h.toFixed(3) + "%"
                }
                cap={res?.quote?.USD?.market_cap.toFixed(0)}
                vol={res?.quote?.USD?.volume_24h.toFixed(0)}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
