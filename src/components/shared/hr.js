/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View } from "react-native";

export default function Hr(props) {
  return (
    <View
      style={{
        borderBottomColor: props.color,
        borderBottomWidth: 0.3,
        paddingBottom: 12,
        opacity: 0.5,
      }}
    />
  );
}
