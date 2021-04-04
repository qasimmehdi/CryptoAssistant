import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingTop: 12,
  },
  coinCell: {
    flex: 1,
    flexDirection: "row",
  },
  exchangeIcon: {
    width: 24,
    height: 24,
    alignSelf: "center",
    marginRight: 10,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: "column-reverse",
    marginBottom: 10,
  },
  inputForm: {
    marginTop: 10,
  },
  waitText: {
    flex: 1,
    textAlign: "center",
  },
});
