/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text} from 'galio-framework';
import {View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {getAllTransactions} from '../../db/methods';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const base = useSelector(state => state.setSelectedCoin.base);

  useEffect(() => {
    getAllTransactions(base)
      .then(resp => {
        let tempArray = [];
        const len = resp.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < resp[i].rows.length; j++) {
            let item = resp[i].rows.item(j);
            console.log(item);
            tempArray.push(item);
          }
        }
        console.log(tempArray);
        setTransactions([...tempArray]);
        console.log(tempArray.length);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={sharedStyles.body}>
      <ScrollView>
        {transactions.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text color={COLOR.WHITE} size={12}>
              Pair: {item.base + '/' + item.quote}
            </Text>
            <Text color={COLOR.WHITE} size={12}>
              Price: {item.price}
            </Text>
            <Text color={COLOR.WHITE} size={12}>
              {item.fee}
            </Text>
            <Text color={COLOR.WHITE} size={12}>
              Date: {item.notes.split('T')[0]}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
