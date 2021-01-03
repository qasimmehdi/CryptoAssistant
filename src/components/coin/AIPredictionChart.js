/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image} from 'react-native';
import {View} from 'react-native';
import {sharedStyles} from '../shared/shared.style';
import chart from '../../assets/ai-chart.png';
import {Text} from 'galio-framework';
import {COLOR} from '../shared/colors';

export default function AIPredictionChart() {
  return (
    <View style={sharedStyles.body}>
      <Text color={COLOR.WHITE} h4 style={{textAlign: 'center'}}>
        Comming soon
      </Text>
      <Image
        source={chart}
        style={{
          flex: 6,
          height: undefined,
          width: undefined,
          marginBottom: 200,
        }}
        resizeMode="contain"
        /* width={Dimensions.get('window').width}
        height={100} */
      />
    </View>
  );
}
