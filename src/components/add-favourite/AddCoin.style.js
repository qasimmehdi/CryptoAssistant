import { StyleSheet } from "react-native";
import { COLOR } from "../shared/colors";

export const addCoinStyle = StyleSheet.create({
  input: {
    borderColor: COLOR.APP_GREY,
    backgroundColor: COLOR.BG,
  },
  row: {
    flexDirection: "row",
    paddingTop: 12,
  },
  coinName: {
    alignSelf: "center",
  },
  price: {
    flex: 2,
    marginRight: 12,
  },
  holding: {
    flex: 2,
    marginRight: 12,
  },
  rowBell: {
    flex: 0.4,
    alignSelf: "center",
    textAlign: "center",
  },
  addBtn: {
    width: 50,
    height: 25,
    borderColor: COLOR.APP_GREY,
    alignSelf: "flex-end",
  },
  coinIcon: {
    width: 24,
    height: 24,
    alignSelf: "center",
    marginRight: 10,
  },
  coinCell: {
    flex: 1,
    flexDirection: "row",
  },
});
