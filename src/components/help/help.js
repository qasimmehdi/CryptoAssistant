/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import {Text} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';

export default function Help() {
  return (
    <View style={sharedStyles.body}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{paddingBottom: 10}}>
          <Text h5 color={COLOR.WHITE}>
            What is cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`A cryptocurrency (or crypto currency or crypto for short) is a digital asset designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger existing in a form of computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. It typically does not exist in physical form (like paper money) and is typically not issued by a central authority. Cryptocurrencies typically use decentralized control as opposed to centralized digital currency and central banking systems. When a cryptocurrency is minted or created prior to issuance or issued by a single issuer, it is generally considered centralized. When implemented with decentralized control, each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database.`}
          </Text>
        </View>
        <View style={{paddingBottom: 5}}>
          <Text h5 color={COLOR.WHITE}>
            How to connect your exchange?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at diam dictum, sagittis ante sit amet, placerat mauris. Donec lobortis est in varius eleifend. Vestibulum malesuada lacus facilisis ex rutrum porttitor. Praesent a maximus eros. Fusce a tempor eros. Duis quis rutrum lacus, malesuada facilisis ante. Suspendisse congue et dui vel convallis. Nam ac finibus erat, ut eleifend dui. Suspendisse sodales molestie urna non tristique. Donec id libero ante. Vivamus feugiat hendrerit tellus eget facilisis. Fusce ipsum tellus, iaculis tincidunt quam luctus, lacinia mollis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          </Text>
        </View>
        <View style={{paddingBottom: 5}}>
          <Text h5 color={COLOR.WHITE}>
            How to buy cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at diam dictum, sagittis ante sit amet, placerat mauris. Donec lobortis est in varius eleifend. Vestibulum malesuada lacus facilisis ex rutrum porttitor. Praesent a maximus eros. Fusce a tempor eros. Duis quis rutrum lacus, malesuada facilisis ante. Suspendisse congue et dui vel convallis. Nam ac finibus erat, ut eleifend dui. Suspendisse sodales molestie urna non tristique. Donec id libero ante. Vivamus feugiat hendrerit tellus eget facilisis. Fusce ipsum tellus, iaculis tincidunt quam luctus, lacinia mollis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          </Text>
        </View>
        <View style={{paddingBottom: 5}}>
          <Text h5 color={COLOR.WHITE}>
            How to sell cryptocurrency?
          </Text>
          <Text p color={COLOR.APP_GREY} size={12}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at diam dictum, sagittis ante sit amet, placerat mauris. Donec lobortis est in varius eleifend. Vestibulum malesuada lacus facilisis ex rutrum porttitor. Praesent a maximus eros. Fusce a tempor eros. Duis quis rutrum lacus, malesuada facilisis ante. Suspendisse congue et dui vel convallis. Nam ac finibus erat, ut eleifend dui. Suspendisse sodales molestie urna non tristique. Donec id libero ante. Vivamus feugiat hendrerit tellus eget facilisis. Fusce ipsum tellus, iaculis tincidunt quam luctus, lacinia mollis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
