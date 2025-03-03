import { StyleSheet, Text, View, Image } from "react-native";
import { RobotIcon, StarIcon } from "../../../../shared/icons/icons";
import { RealEstate } from "../../../../shared/types/realEstate";
import { useLanguageStore } from "../../../../core/store/language";
type ParamsType = {
  v: RealEstate;
};
export const Info = ({ v }: ParamsType) => {
  const { language } = useLanguageStore();
  return (
    <View style={{ height: 150, position: "relative" }}>
      <Text style={styles.title}>{v.title[language]}</Text>
      <Text style={styles.contact}>{v.user.email}</Text>
      <Text style={styles.description}>
        {v.description[language].length > 20
          ? `${v.description[language].slice(0, 150)}`
          : v.description[language]}
        {v.description[language].length > 150 ? "..." : ""}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.price}>{v.price} BS</Text>
        <View style={styles.ratingContainer}>
          <Text> {RobotIcon}</Text>
          <Text style={styles.rating}>{v.similarity_score}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  contact: {
    fontSize: 12,
    color: "#888",
    textAlign: "left",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  infoContainer: {
    //put down with flex
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

  },
  rating: {
    fontSize: 14,
  },
});
