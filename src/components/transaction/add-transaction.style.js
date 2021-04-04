import { StyleSheet } from "react-native";

export const transactionStyles = StyleSheet.create({
  input: {
    borderColor: "#808080",
    backgroundColor: "#121212",
    borderRadius: 5,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row-reverse",
    width: 170,
    justifyContent: "flex-start",
  },
  formFields: {
    flex: 1,
    flexDirection: "column",
  },
  field: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    /* borderColor: '#fff',
    borderWidth: 1, */
  },
  fieldText: {
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
    alignSelf: "center",
  },
  notesText: {
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  buysellbtn: {
    flex: 1,
    width: "auto",
    /* alignSelf: 'center', */
  },
  notesInput: {
    borderColor: "#808080",
    backgroundColor: "#121212",
    borderRadius: 5,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 70,
  },
});
