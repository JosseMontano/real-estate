import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SearchIcon } from "../../../shared/icons/icons";
import { Btn } from "../../../core/components/btn";
type ParamsType = {
 
};
export const Header = ({  }: ParamsType) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>InmoApp</Text>
        <Btn text="Publicar propiedad" />
      </View>

      <ImageBackground
        source={require("../../../shared/assets/bg.jpg")}
        style={styles.imageContainer}
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
    paddingInline: 40,
    paddingTop: 40,
    paddingBottom: 20,
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
    height: 400,
    justifyContent: "center",
    paddingHorizontal: 0, // Remove padding to match full width
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire parent container
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 20,
  },
});
