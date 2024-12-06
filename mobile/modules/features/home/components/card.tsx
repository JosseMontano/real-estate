import { StyleSheet, Text, View, Image } from "react-native";
import { StarIcon } from "../../../shared/icons/icons";
import { truncateText } from "../../../core/helpers/truncateText";
import { RealEstate } from "../../../shared/types/realEstate";
import { Language } from "../../../core/store/language";
type ParamsType = {
  v: RealEstate;
  language: Language;
};
export const Card = ({ v, language }: ParamsType) => {
  return (
    <View style={styles.contaier} key={v.id}>
      <Image
        source={{
          uri: v.photos[0].image,
        }}
        style={styles.image}
      />
      <Text>{truncateText(v.description[language], 37)}</Text>
      <View style={styles.infoContainer}>
        <Text>{v.price} BS</Text>
        <Text>|</Text>
        <View style={styles.startContainer}>
          <StarIcon size={15} />
          <Text>4.5</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contaier: {
    width: "45%",
    gap: 5,
  },
  image: {
    width: 150,
    height: 180,
    objectFit: "cover",
    borderRadius: 20,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",

    gap: 7,
  },
  startContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
});
