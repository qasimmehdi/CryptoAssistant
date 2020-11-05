import {StyleSheet} from 'react-native';

export const transactionStyles = StyleSheet.create({
  input: {
    borderColor: '#808080',
    backgroundColor: '#121212',
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  formFields: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
  },
  fieldText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});
