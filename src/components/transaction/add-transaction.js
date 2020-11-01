import { Text } from 'galio-framework';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import CustomInput from '../shared/custom-input';
import {sharedStyles} from '../shared/shared.style';

const AddTransaction = ({navigation}) => {
  useEffect(() => {}, []);
  return (
    <View style={sharedStyles.body}>
      <Text>Add Transaction</Text>
    </View>
  );
};
export default AddTransaction;
