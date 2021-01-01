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
  input: {
    borderColor: COLOR.APP_GREY,
    backgroundColor: COLOR.BG,
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  borderDanger: {
    borderColor: COLOR.RED,
  },
  borderOk: {
    borderColor: COLOR.APP_GREY,
  },
});
