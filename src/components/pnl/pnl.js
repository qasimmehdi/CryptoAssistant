import { Text } from "galio-framework";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import iconImages from "../../assets/coinIcons/names";
import CCXT from "../../services/ccxt/react-ccxt";
import { rowStyles } from "../../styles/rowStyles";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";
import Loading from "../SplashScreen";

export default function PNL() {
  const ccxt = new CCXT();

  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  /* const [totalProfit, setTotalProfit] = useState(0); */

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getData();   //GETTING DATA FROM API KEYS OF SPECIFIC USER AND GET THEIR CRYPTO HOLDINGS
  }, []);

  useEffect(() => {
    (async () => {
      if (assets.length > 0) {
        const total = assets
          .map((item) => item.amount)
          .reduce((prev, next) => parseFloat(prev) + parseFloat(next));  //CALCULATING TOTAL PRICES
        setTotalValue(total);
        console.log(total);
      }
    })();
  }, [assets]);

  const getData = async () => {
    setIsLoading(true);   //LOADING CONDITIONALLY
    const holdings = await ccxt.GetHoldings();  //GET USER HOLDING OF COINS OR HIS ASSETS
    setAssets(holdings);
    setIsLoading(false);
  };

  return (
    <View style={sharedStyles.body}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 15,
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
            Total Value ($)
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
          {/* <Text style={{ paddingTop: 5 }} color={COLOR.APP_GREY} size={12} bold>
            Total Profit (USD)
          </Text>
          <Text style={{ paddingTop: 5 }} color={COLOR.WHITE} size={18} bold>
            ${numeral(totalProfit).format("0,0[.][00000000]")}
          </Text> */}
        </View>
      </View>

      <View style={{ paddingTop: 10, display: "flex", flex: 1 }}>
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
            Quantity
          </Text>
          <Text color={COLOR.APP_GREY} size={12} bold>
            Value ($)
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Loading />
          ) : (
            assets.map((asset, i) => (
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
                    {numeral(asset.quantity).format("0,0[.][00000000]")}
                  </Text>
                  <Text color={COLOR.WHITE} size={14} bold>
                    ${numeral(asset.amount).format("0,0[.][00000000]")}
                  </Text>
                </View>
              </LinearGradient>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}
