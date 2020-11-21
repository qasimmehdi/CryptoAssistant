/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'galio-framework';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import iconImages from '../assets/coinIcons/names';
import {rowStyles} from '../styles/rowStyles';
import {COLOR} from './shared/colors';
import Hr from './shared/hr';

export default function Row(props) {
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
          <Text color={COLOR.WHITE} size={12} bold style={{textAlign: 'right'}}>
            {props.price}
          </Text>
          <Text
            color={props.priceChange.includes('-') ? COLOR.RED : COLOR.GREEN}
            size={11}
            style={{textAlign: 'right'}}>
            {props.priceChange}
          </Text>
        </View>
        <View style={rowStyles.price}>
          {!props.balance ? (
            <Button
              color="transparent"
              size={10}
              round
              style={rowStyles.addBtn}
              onPress={() => {
                console.log(props.name, props.quote);
                props.navigation.navigate('AddTransaction', {
                  base: props.name,
                  quote: props.quote,
                  currentPrice: props.price,
                });
              }}>
              <Text color={COLOR.WHITE} size={14} style={{textAlign: 'center'}}>
                Add
              </Text>
            </Button>
          ) : (
            <React.Fragment>
              <Text
                color={COLOR.WHITE}
                size={12}
                bold
                style={{textAlign: 'right'}}>
                {props.holdingConverted}
              </Text>
              <Text
                color={COLOR.APP_GREY}
                size={11}
                style={{textAlign: 'right'}}>
                {props.holdingUnits}
              </Text>
            </React.Fragment>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddNotification', {
              base: props.name,
              quote: props.quote,
              isNotificationOn: props.notification,
            })
          }>
          <Icon
            name={props.notification ? 'notifications' : 'notifications-none'}
            color={props.notification ? COLOR.WHITE : COLOR.APP_GREY}
            size={17}
            style={rowStyles.rowBell}
          />
        </TouchableOpacity>
      </View>
      <Hr color={COLOR.APP_GREY} />

    </React.Fragment>
  );
}
