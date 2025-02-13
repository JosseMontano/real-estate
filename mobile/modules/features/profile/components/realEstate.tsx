import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { RealEstate } from "../../../shared/types/realEstate";
import { useNagigation } from "../../../core/hooks/useNavigation";
type ParamsType = {
  v: RealEstate;
};
export const RealEstateImg = ({ v }: ParamsType) => {
  const { handleRedirect } = useNagigation();
  return (
    <Pressable
      onPress={() => {
        console.log(v);
        handleRedirect("RealEstate", v);
      }}
      style={styles.image}
    >
      <Image
        key={v.id}
        source={{
          uri: v.photos[0].image,
        }}
        style={[styles.image, {width:"100%"}]}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "49%",
    height: 150,
    borderColor: "#212121",
    borderWidth: 0.7,
  },
});
