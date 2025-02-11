import React, { useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { RealEstate } from "../../../../shared/types/realEstate";
import WebView from "react-native-webview";
import { urls } from "../../../../core/constants/endpoint";
import { Info } from "./info";
import { HeaderCard } from "./headerCard";

type ParamsType = {
  v: RealEstate;
  showRealEstate: (v: RealEstate) => void;
};

export const Card = ({ v, showRealEstate }: ParamsType) => {
  const [activeButton, setActiveButton] = useState<"info" | "places">("info");
  const mapUrl = urls.web + "map/" + v.lat_long;

  return (
    <View style={styles.container} key={v.id}>
      <Pressable onPress={() => showRealEstate(v)}>
        <Image
          source={{
            uri: v.photos[0].image,
          }}
          style={styles.image}
        />
      </Pressable>

      <HeaderCard activeButton={activeButton} setActiveButton={setActiveButton}/>

      {activeButton == "info" && <Info v={v} />}

      {activeButton == "places" && (
        <WebView
          source={{ uri: mapUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },

  webView: {
    height: 115,
    width: "96%",
  },
});
