import {StyleSheet} from 'react-native';
import {COLOR} from '../shared/colors';

export const notificationsStyle = StyleSheet.create({
  input: {
    borderColor: COLOR.APP_GREY,
    backgroundColor: COLOR.BG,
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  formFields: {
    flex: 7,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  saveBtn: {
    flex: 1,
    marginRight: 15,
    marginLeft: 15,
  },
});
