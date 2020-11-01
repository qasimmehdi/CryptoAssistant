import {StyleSheet} from 'react-native';

export const dashboardStyles = StyleSheet.create({
  topCardText: {
    paddingTop: 5,
    marginLeft: 20,
  },
  topCard: {
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linearGradient: {
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
    flexDirection: 'row-reverse',
    marginLeft: 20,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
  },

  container: {
    flex: 7,
    padding: 16,
    paddingTop: 30,
  },
  head: {
    height: 40,
    borderWidth: 0,
  },
  text: {
    margin: 6,
    color: '#fff',
    fontWeight: 'bold',
  },
  tableBorder: {
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  thead: {
    flexDirection: 'row',
  },
  theadCoin: {
    flex: 1,
  },
  theadPrice: {
    flex: 2,
    textAlign: 'right',
  },
  theadHoldings: {
    flex: 2,
    textAlign: 'right',
  },
  theadBell: {
    flex: 0.4,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
