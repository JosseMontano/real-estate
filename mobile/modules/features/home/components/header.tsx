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
import { Navbar } from "../../../shared/components/navbar";

type ParamsType = {
  goRealEstates: () => void;
};

export const Header = ({ goRealEstates }: ParamsType) => {
  const { handleRedirect } = useNagigation();
  const { user } = useAuthStore();
  const { texts } = useLanguageStore();

  const redirect = () => {
    if (user) handleRedirect("Profile");
    else handleRedirect("Auth");
  };

  return (
    <View>
      <Navbar onClick={redirect} texts={texts.createRE} backgroundColor="#000"/>

      <ImageBackground
        source={require("../../../shared/assets/bg.jpg")}
        style={styles.imageContainer}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>{texts.homeTitle}</Text>
          <Text style={styles.subtitle}>{texts.homeDescription}</Text>
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
