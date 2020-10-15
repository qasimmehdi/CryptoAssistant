import React from 'react';
import { COLOR } from "./shared/colors";
import { View } from 'react-native';
import { Text } from 'galio-framework';
import { rowStyles } from '../styles/rowStyles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Hr from './shared/hr';


export default function Row(props) {
    return (
        <React.Fragment>
            <View style={rowStyles.row}>
                <Text
                    color={COLOR.WHITE}
                    size={14}
                    bold
                    style={rowStyles.coinName}>
                    {props.name}
                </Text>
                <View style={rowStyles.price}>
                    <Text
                        color={COLOR.WHITE}
                        size={14}
                        bold
                        style={{ textAlign: "right" }}
                    >
                        {props.price}
                    </Text>
                    <Text
                        color={COLOR.WHITE}
                        size={11}
                        style={{ textAlign: "right" }}
                    >
                        {props.priceChange}
                    </Text>
                </View>
                <View style={rowStyles.price}>
                    <Text
                        color={COLOR.WHITE}
                        size={14}
                        bold
                        style={{ textAlign: "right" }}
                    >
                        {props.holdingConverted}
                    </Text>
                    <Text
                        color={COLOR.APP_GREY}
                        size={11}
                        style={{ textAlign: "right" }}
                    >
                        {props.holdingUnits}
                    </Text>
                </View>
                <Icon
                    name="notifications"
                    color={COLOR.APP_GREY}
                    size={17}
                    style={rowStyles.rowBell}>
                </Icon>
            </View>
            <Hr color={COLOR.APP_GREY} />
        </React.Fragment>
    );
}


