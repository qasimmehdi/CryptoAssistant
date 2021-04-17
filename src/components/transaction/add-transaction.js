/* eslint-disable react-native/no-inline-styles */
import { Button, Input, Text } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { COLOR } from "../shared/colors";
import CustomInput from "../shared/custom-input";
import { regexes } from "../shared/regexes";
import { sharedStyles } from "../shared/shared.style";
import { transactionStyles } from "./add-transaction.style";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";
import { saveTransaction } from "../../db/methods";
import { ScrollView } from "react-native";

const AddTransaction = ({ route, navigation }) => {
  const { base, quote, currentPrice } = route.params;
  const [price, setPrice] = useState(
    `${currentPrice.replace(regexes.float, "")}`
  );
  const [quantity, setQuantity] = useState("");
  const [fee, setFee] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [exchange, setExchange] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [gradientColors, setGradientColors] = useState([
    COLOR.DISABLED,
    COLOR.DISABLED,
  ]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buyBtnColor, setBuyBtnColor] = useState(COLOR.BUY);
  const [sellBtnColor, setSellBtnColor] = useState(COLOR.DISABLED);
  const [side, setSide] = useState("Buy");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTime(Platform.OS === "ios");
    setTime(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };
  const showTimepicker = () => {
    setShowTime(true);
  };

  const onSave = () => {  //ADDING MANUAL TRANSACTION IN DB
    saveTransaction(
      exchange,
      base,
      quote,
      price,
      side,
      quantity,
      fee,
      moment(date).format("x"),
      moment(time).format("x"),
      notes
    );
    navigation.navigate("Dashboard");
  };

  useEffect(() => {
    if (exchange && base && quote && price && side && quantity && fee) { //ALL FIELD VALIDATION, MANDATORY
      setSaveDisabled(false);
      setGradientColors([COLOR.GRADIENT_0, COLOR.GRADIENT_1]);
    } else {
      setSaveDisabled(true);
      setGradientColors([COLOR.DISABLED, COLOR.DISABLED]);
    }
  }, [exchange, base, quote, price, side, quantity, fee]);

  /* useEffect(() => {}, []); */
  return (
    <ScrollView style={sharedStyles.body} showsVerticalScrollIndicator={false}>
      <View style={transactionStyles.formFields}>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Exchange
          </Text>
          <CustomInput
            style={transactionStyles.input}
            textAlign={"right"}
            placeholder="Exchange"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={exchange}
            onChangeText={(text) => setExchange(text)}
            pattern={[regexes.password]}
            /* onValidation={isValid => performValidation(isValid)} */
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Pair
          </Text>
          <CustomInput
            style={transactionStyles.input}
            textAlign={"right"}
            placeholder="0"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={base + "/" + quote}
            /* onChangeText={text => setPrice(text)} */
            pattern={[regexes.password]}
            /* onValidation={isValid => performValidation(isValid)} */
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Side
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Button
              color={buyBtnColor}
              style={transactionStyles.buysellbtn}
              onPress={() => {
                setSide("Buy");
                setBuyBtnColor(COLOR.BUY);
                setSellBtnColor(COLOR.DISABLED);
              }}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Buy
              </Text>
            </Button>

            <Button
              color={sellBtnColor}
              style={transactionStyles.buysellbtn}
              onPress={() => {
                setSide("Sell");
                setBuyBtnColor(COLOR.DISABLED);
                setSellBtnColor(COLOR.SELL);
              }}
            >
              <Text color={COLOR.WHITE} h5 bold>
                Sell
              </Text>
            </Button>
          </View>
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Price per coin
          </Text>
          <Input
            style={transactionStyles.input}
            placeholder="0"
            textAlign={"right"}
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={price}
            onChangeText={(text) => setPrice(text.replace(regexes.float, ""))}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Quantity
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={"right"}
            placeholder="0"
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={quantity}
            onChangeText={(text) =>
              setQuantity(text.replace(regexes.float, ""))
            }
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Fee
          </Text>
          <Input
            style={transactionStyles.input}
            textAlign={"right"}
            placeholder="0"
            type="decimal-pad"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={fee}
            onChangeText={(text) => setFee(text.replace(regexes.float, ""))}
          />
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Date
          </Text>
          <TouchableOpacity onPress={showDatepicker}>
            <CustomInput
              style={transactionStyles.input}
              textAlign={"right"}
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={moment(date).format("MMMM D, YYYY")}
              editable={false}
              selectTextOnFocus={false}
            />
            {showDate && (
              <DateTimePicker
                testID="DatePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={transactionStyles.field}>
          <Text style={transactionStyles.fieldText} bold color={COLOR.APP_GREY}>
            Time
          </Text>
          <TouchableOpacity onPress={showTimepicker}>
            <CustomInput
              style={transactionStyles.input}
              textAlign={"right"}
              placeholderTextColor={COLOR.APP_GREY}
              iconColor={COLOR.APP_GREY}
              color={COLOR.WHITE}
              value={moment(time).format("hh:mm a")}
              editable={false}
              selectTextOnFocus={false}
            />
            {showTime && (
              <DateTimePicker
                testID="TimePicker"
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Text style={transactionStyles.notesText} bold color={COLOR.APP_GREY}>
            Notes
          </Text>
          <CustomInput
            multiline={true}
            numberOfLines={3}
            style={transactionStyles.notesInput}
            placeholder="Add a note (optional)"
            placeholderTextColor={COLOR.APP_GREY}
            iconColor={COLOR.APP_GREY}
            color={COLOR.WHITE}
            value={notes}
            onChangeText={(text) => setNotes(text)}
            /* onValidation={isValid => performValidation(isValid)} */
          />
        </View>
      </View>
      <View style={{ paddingBottom: 5 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors}
          style={sharedStyles.linearGradient}
        >
          <Button
            round
            color="transparent"
            style={sharedStyles.borderless}
            disabled={saveDisabled}
            onPress={() => onSave()}
          >
            <Text color={COLOR.WHITE} h5 bold>
              Save Transaction
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};
export default AddTransaction;
