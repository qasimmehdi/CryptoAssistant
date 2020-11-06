import {Text} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';

export default function Settings() {
  return (
    <View style={sharedStyles.body}>
      <Text color={COLOR.WHITE}>Settings</Text>
    </View>
  );
}
