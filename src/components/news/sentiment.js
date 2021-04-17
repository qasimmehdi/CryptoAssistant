import { Input } from "galio-framework";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { addCoinStyle } from "../add-favourite/AddCoin.style";
import { COLOR } from "../shared/colors";
import { sharedStyles } from "../shared/shared.style";

export default function Sentiment() {
  const [search, setSearch] = useState("");
  const [searchProp, setSearchProp] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchProp(search);     //IF USER SEARCH ITEM THEN MAKE REST CALL TO SEARCH
    }, 1000);

    return () => clearTimeout(delayDebounceFn);   //STOP IF USER LEAVE KEYBOARD
  }, [search]);

  return (
    <View style={sharedStyles.body}>
      <Input
        style={addCoinStyle.input}
        placeholder="Search"
        placeholderTextColor={COLOR.APP_GREY}
        value={search}
        onChangeText={setSearch}
        color={COLOR.WHITE}
      />
      <WebView
        source={{ uri: `http://twitter-embed.herokuapp.com/${searchProp}` }}
      />
      {/* http://10.0.2.2:3000/ */}
    </View>
  );
}
