import { StyleSheet, Text, View, Image } from "react-native";
import { FacebookIcon, InstagramIcon, YTIcon } from "../../../shared/icons/icons";

type ParamsType = {};
export const Footer = ({}: ParamsType) => {
  return (
    <View style={styles.container}>
     <View style={styles.iconsContainer}>
     {FacebookIcon}
      {YTIcon}
      {InstagramIcon}
     </View>
      <Text style={styles.text}>
        Copyright © INMUEBLES EN LA NUBE - Todos los derechos reservados
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 20,
    gap:10,
  },
  iconsContainer:{
    flexDirection:"row",
    justifyContent:"center",
    width:"100%",
    gap:10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
  },
});
