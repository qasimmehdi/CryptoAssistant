import { Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import iconImages from "../../assets/coinIcons/names";
import { rowStyles } from "../../styles/rowStyles";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";

export default function PNL() {
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const [assets, setAssets] = useState([
    { symbol: "BTC", profit: 12420 },
    { symbol: "ADA", profit: 12420 },
    { symbol: "REN", profit: 12420 },
    { symbol: "ETH", profit: 12420 },
    { symbol: "DOT", profit: 12420 },
    { symbol: "LTC", profit: 12420 },
    { symbol: "BNB", profit: 12420 },
    { symbol: "LUNA", profit: 12420 },
    { symbol: "REN", profit: 12420 },
    { symbol: "ETH", profit: 12420 },
    { symbol: "DOT", profit: 12420 },
    { symbol: "LTC", profit: 12420 },
  ]);

  useEffect(() => {
    //get values
  }, []);

  return (
    <View style={sharedStyles.body}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{ paddingTop: 5 }} color={COLOR.APP_GREY} size={12} bold>
            Total Value (USD)
          </Text>
          <Text style={{ paddingTop: 5 }} color={COLOR.WHITE} size={18} bold>
            ${numeral(totalValue).format("0,0[.][00000000]")}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{ paddingTop: 5 }} color={COLOR.APP_GREY} size={12} bold>
            Total Profit (USD)
          </Text>
          <Text style={{ paddingTop: 5 }} color={COLOR.WHITE} size={18} bold>
            ${numeral(totalProfit).format("0,0[.][00000000]")}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 10, display: 'flex', flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 5,
            paddingLeft: 5,
            paddingBottom: 10,
          }}
        >
          <Text color={COLOR.APP_GREY} size={12} bold>
            Coin
          </Text>
          <Text color={COLOR.APP_GREY} size={12} bold>
            Profit
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {assets.map((asset, i) => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
              style={{
                borderRadius: 8,
                marginBottom: 15,
              }}
              key={`asset-${i}`}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 40,
                  paddingLeft: 5,
                  paddingRight: 8,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={rowStyles.coinIcon}
                    source={
                      iconImages.hasOwnProperty(asset.symbol)
                        ? iconImages[asset.symbol]
                        : iconImages.GENERIC
                    }
                  />
                  <Text color={COLOR.WHITE} size={14} bold>
                    {asset.symbol}
                  </Text>
                </View>
                <Text color={COLOR.WHITE} size={14} bold>
                  ${numeral(asset.profit).format("0,0[.][00000000]")}
                </Text>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
