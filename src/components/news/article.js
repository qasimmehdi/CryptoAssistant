import React from 'react';
import {Text} from 'galio-framework';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';

export default function Article() {
  return (
    <View style={sharedStyles.body}>
      <Text color={COLOR.WHITE}>Articles</Text>
    </View>
  );
}