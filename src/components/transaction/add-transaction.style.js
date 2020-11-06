import {StyleSheet} from 'react-native';

export const transactionStyles = StyleSheet.create({
  input: {
    borderColor: '#808080',
    backgroundColor: '#121212',
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1,
    flexDirection: 'row-reverse',
    width: 170,
    justifyContent: 'flex-start',
  },
  formFields: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  saveBtn: {
    marginRight: 15,
    marginLeft: 15,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fieldText: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'center',
  },
});
