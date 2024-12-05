import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { categoryType } from "../types/types";
type ParamsType = {
  activeCategory: categoryType;
  setActiveCategory: (v: categoryType) => void;
};
export const Categories = ({
  activeCategory,
  setActiveCategory,
}: ParamsType) => {
  return (
    <View style={styles.categoryContainer}>
      <Pressable onPress={() => setActiveCategory("realEstates")}>
        <Text
          style={[
            styles.category,
            activeCategory === "realEstates" && styles.active,
          ]}
        >
          Inmuebles
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveCategory("Favs")}>
        <Text
          style={[styles.category, activeCategory === "Favs" && styles.active]}
        >
          Favoritos
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  category: {
    textAlign: "center",
    fontSize: 16,
    color: "#4e4e4e",
  },
  active: {
    color: "#181818",
    fontWeight: "500",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});
