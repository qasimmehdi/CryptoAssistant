/* eslint-disable react-native/no-inline-styles */
import { Text } from "galio-framework";
import React from "react";
import { Image, View } from "react-native";
import iconImages from "../../assets/coinIcons/names";
import { rowStyles } from "../../styles/rowStyles";
import { COLOR } from "../shared/colors";
import Hr from "../shared/hr";
import numeral from "numeral";

export default function MarketRow(props) {
  return (
    <React.Fragment>
      <View style={rowStyles.row}>
        <View style={rowStyles.coinCell}>
          <Image
            style={rowStyles.coinIcon}
            source={
              iconImages.hasOwnProperty(props.name)
                ? iconImages[props.name]
                : iconImages.GENERIC
            }
          />
          <Text color={COLOR.WHITE} size={14} bold style={rowStyles.coinName}>
            {props.name}
          </Text>
        </View>
        <View style={rowStyles.price}>
          <Text
            color={COLOR.WHITE}
            size={12}
            bold
            style={{ textAlign: "right" }}
          >
            {numeral(props.price).format("$0,0.[00]")}
          </Text>
          <Text
            color={props.priceChange.includes("-") ? COLOR.RED : COLOR.GREEN}
            size={11}
            style={{ textAlign: "right" }}
          >
            {props.priceChange}
          </Text>
        </View>
        <View style={rowStyles.price}>
          <Text
            color={COLOR.WHITE}
            size={12}
            bold
            style={{ textAlign: "right" }}
          >
            {numeral(props.cap).format("$0,0.[00]")}
          </Text>
          <Text color={COLOR.APP_GREY} size={11} style={{ textAlign: "right" }}>
            {numeral(props.vol).format("$0,0.[00]")}
          </Text>
        </View>
      </View>
      <Hr color={COLOR.APP_GREY} />
    </React.Fragment>
  );
}
