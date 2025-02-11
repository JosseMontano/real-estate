import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Btn } from "../../../core/components/btn";
import { useNagigation } from "../../../core/hooks/useNavigation";
import useAuthStore from "../../../core/store/auth";
import { useLanguageStore } from "../../../core/store/language";

type ParamsType = {
  goRealEstates: () => void;
};

export const Header = ({ goRealEstates }: ParamsType) => {
  const { handleRedirect } = useNagigation();
  const { user } = useAuthStore();
  const {texts} = useLanguageStore()

  const redirect = () => {
    if (user) handleRedirect("Profile");
    else handleRedirect("Auth");
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>InmoApp</Text>
        <Btn text={texts.createRE} handleOnSubmit={() => redirect()} />
      </View>

      <ImageBackground
        source={require("../../../shared/assets/bg.jpg")}
        style={styles.imageContainer}
        resizeMode="cover" 
      >
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>
            {texts.homeTitle}
          </Text>
          <Text style={styles.subtitle}>
            {texts.homeDescription}
          </Text>
          <Btn
            text={texts.homeBtn}
            withAnimation
            handleOnSubmit={goRealEstates}
          />
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
    position: "absolute",
    zIndex: 10,
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
    position: "static",
    width: "100%", 
    height: Dimensions.get("window").height * 1, // 90% of screen height (adjust as needed)
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 20,
  },
});
