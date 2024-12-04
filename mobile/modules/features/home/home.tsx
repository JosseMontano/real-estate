import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { primaryColor } from "../../core/constants/colors";
import { StarIcon } from "../../shared/icons/icons";
import { Card } from "./components/card";

export function HomePage() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Descubre el sueño de tu aplicacion</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.btnContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <Pressable style={styles.btn}>
                <Text style={styles.btnText}>hi123</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.cardContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
            <Card i={i} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#fff",
    padding: 25,
    marginBottom: 70,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
  },
});
