import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { RealEstate } from "../../shared/types/realEstate";
import Carousel from "./carousel";
import { useLanguageStore } from "../../core/store/language";
import { urls } from "../../core/constants/endpoint";
import WebView from "react-native-webview";
import { GeneralContainer } from "./generalContainer";

type ParamsType = {};
export const RealEstatePage = ({}: ParamsType) => {
  const { language } = useLanguageStore();
  const route = useRoute<RouteProp<{ RealEstate: RealEstate }, "RealEstate">>();
  const realEstate = route.params;

  const mapUrl = urls.web + "#/map/" + realEstate.lat_long;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Carousel realEstate={realEstate} />
        
        <GeneralContainer v={realEstate} />

        <WebView
          source={{ uri: mapUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },

  webView: {
    height: 150,
    width: "90%",
    alignSelf: "center",
  },
});
