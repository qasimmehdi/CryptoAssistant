import {StyleSheet} from 'react-native';
import {COLOR} from './colors';

export const sharedStyles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.BG,
    paddingRight: 15,
    paddingLeft: 15,
  },
  borderless: {
    borderWidth: 0,
  },
  linearGradient: {
    borderRadius: 25,
  },
});
