import { StyleSheet } from "react-native";
import { COLOR } from "../shared/colors";

export const notificationsStyle = StyleSheet.create({
  input: {
    borderColor: COLOR.APP_GREY,
    backgroundColor: COLOR.BG,
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  infoText: {
    flex: 7,
    flexDirection: "column",
  },
  saveBtn: {
    flex: 1,
  },
  pairInfo: {
    marginTop: 10,
  },
});
