/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import { Text } from "galio-framework";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";

//help page which we can show some help tips to user

export default function Help() {
  return (
    <View style={sharedStyles.body}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ paddingBottom: 10 }}>
          <Text h5 color={COLOR.WHITE}>
            What is cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`A cryptocurrency (or crypto currency or crypto for short) is a digital asset designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger existing in a form of computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. It typically does not exist in physical form (like paper money) and is typically not issued by a central authority. Cryptocurrencies typically use decentralized control as opposed to centralized digital currency and central banking systems. When a cryptocurrency is minted or created prior to issuance or issued by a single issuer, it is generally considered centralized. When implemented with decentralized control, each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database.`}
          </Text>
        </View>
        <View style={{ paddingBottom: 5 }}>
          <Text h5 color={COLOR.WHITE}>
            How to connect your exchange?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`First create an API key from your exchange account and give it permission for trading. Then on the Home screen open side menu and click on "Connect Exchange" there you will see a list of supported exchanges click on the one you want and enter you public and secret keys and press "Add Connection". This will save the your keys on your device only and start syncing your balances and old trades to your device only.`}
          </Text>
        </View>
        <View style={{ paddingBottom: 5 }}>
          <Text h5 color={COLOR.WHITE}>
            How to buy cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`Go to Trade screen select Buy then select the excahnge and currency pair you want to trade, set the price and amount and press Buy button. Remember this will be a limit order. You can see the order you created in Open Orders screen.`}
          </Text>
        </View>
        <View style={{ paddingBottom: 5 }}>
          <Text h5 color={COLOR.WHITE}>
            How to sell cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`Go to Trade screen select Sell then select the excahnge and currency pair you want to trade, set the price and amount and press Sell button. Remember this will be a limit order. You can see the order you created in Open Orders screen.`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
