import {Button, Input, Text} from 'galio-framework';
import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {styles} from './connect-exchange.style';
import CCXT from '../../services/ccxt/react-ccxt';
import Loading from '../SplashScreen';
import {CommonActions} from '@react-navigation/native';

export default function ConnectExchange({route, navigation}) {
  const {name} = route.params;
  const [api, setApi] = useState('');
  const [secret, setSecret] = useState('');
  const [disbutton, setdisbutton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addexchange = () => {
    setdisbutton(true);
    setIsLoading(true);
    new CCXT()
      .addExchange(name, api, secret)
      .then(x => {
        Alert.alert('Success', 'Exchange added successfully');
        setdisbutton(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          }),
        );
      })
      .catch(() => {
        Alert.alert('Error', 'Invalid Api Keys');
        setdisbutton(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={sharedStyles.body}>
      {isLoading ? (
        <React.Fragment>
          <Loading />
          <Text size={12} color={COLOR.APP_GREY} style={styles.waitText}>
            This may take a few minutes
          </Text>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <View style={styles.inputForm}>
            <Text color={COLOR.APP_GREY} bold>
              Connection Name
            </Text>
            <Text color={COLOR.WHITE} bold>
              {name}
            </Text>
            <View>
              <Input
                style={sharedStyles.input}
                placeholder="API Key"
                placeholderTextColor={COLOR.APP_GREY}
                value={api}
                onChangeText={setApi}
                color={COLOR.WHITE}
              />
              <Input
                style={sharedStyles.input}
                placeholder="Secret Key"
                placeholderTextColor={COLOR.APP_GREY}
                value={secret}
                onChangeText={setSecret}
                color={COLOR.WHITE}
              />
            </View>
          </View>
          <View style={styles.bottomBtn}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[COLOR.GRADIENT_0, COLOR.GRADIENT_1]}
              style={sharedStyles.linearGradient}>
              <Button
                disabled={disbutton}
                onPress={() => addexchange()}
                round
                color="transparent"
                style={sharedStyles.borderless}>
                <Text color={COLOR.WHITE} h5 bold>
                  Add Connection
                </Text>
              </Button>
            </LinearGradient>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}
