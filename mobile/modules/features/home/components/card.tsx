import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { StarIcon } from "../../../shared/icons/icons";
import { truncateText } from "../../../core/helpers/truncateText";
import { RealEstate } from "../../../shared/types/realEstate";
import { Language, useLanguageStore } from "../../../core/store/language";

type ParamsType = {
  v: RealEstate;
  showRealEstate: (v: RealEstate) => void;
};

export const Card = ({ v, showRealEstate }: ParamsType) => {
    const { texts, language } = useLanguageStore();
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

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Informacion</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Lugares</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{v.title[language]}</Text>
      <Text style={styles.contact}>{v.user.email}</Text>
      <Text style={styles.description}>
       {v.description[language]}
      </Text>

      {/* Price and Rating */}
      <View style={styles.infoContainer}>
        <Text style={styles.price}>{v.price} BS</Text>
        <View style={styles.ratingContainer}>
          <StarIcon size={15} />
          <Text style={styles.rating}>{v.user.qualification}</Text>
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  infoContainer: {
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
