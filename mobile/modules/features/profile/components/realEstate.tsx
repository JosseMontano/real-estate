import { StyleSheet, Text, View, Image } from "react-native";
import { RealEstate } from "../../../shared/types/realEstate";
type ParamsType = {
              
    v: RealEstate
};
export const RealEstateImg = ({v}: ParamsType) => {
  return (
    <Image
      key={v.id}
      source={{
        uri: v.photos[0].image,
      }}
      style={styles.image}
    />
  );
};
const styles = StyleSheet.create({  image: {
    width: "49%",
    height: 150,
    borderColor: "#212121",
    borderWidth: 0.7,
  },});
