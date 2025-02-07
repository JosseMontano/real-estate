import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Btn } from "../../../core/components/btn";

type ParamsType = {};

export const Header = ({}: ParamsType) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>InmoApp</Text>
        <Btn text="Publicar propiedad" />
      </View>

      <ImageBackground
        source={require("../../../shared/assets/bg.jpg")}
        style={styles.imageContainer}
        resizeMode="cover" // Ensures the image covers the entire container
      >
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>
            La casa moderna hace la vida mejor.
          </Text>
          <Text style={styles.subtitle}>
            Descubre cómo mejorar tu calidad de vida con una casa a tu medida.
          </Text>
          <Btn text="Explora nuestras propiedades" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    width: "100%",
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20,
    position:"absolute",
    zIndex:10,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
  },
  mainTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#ddd",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  imageContainer: {
    position:"static",
    width: "100%", // Full width
    height: Dimensions.get("window").height * 1, // 90% of screen height (adjust as needed)
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire parent container
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 20,
  },
});