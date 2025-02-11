import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useLanguageStore } from '../../../../core/store/language';
import { primaryColor } from '../../../../core/constants/colors';
type ParamsType = {
    activeButton: "info" | "places"
    setActiveButton: (val:"info" | "places")=>void
}
export const HeaderCard = ({activeButton, setActiveButton}:ParamsType) => {
    const {texts} = useLanguageStore()
    return (
        <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            activeButton === "info" && styles.activeButton,
          ]}
          onPress={() => setActiveButton("info")}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === "info" && styles.activeButtonText,
            ]}
          >
            {texts.btnInfo}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === "places" && styles.activeButton,
          ]}
          onPress={() => setActiveButton("places")}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === "places" && styles.activeButtonText,
            ]}
          >
            {texts.btnPlaces}
          </Text>
        </Pressable>
      </View>
    );
}
const styles = StyleSheet.create({
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
      activeButton: {
        backgroundColor: primaryColor,
      },
      buttonText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
      },
      activeButtonText: {
        color: "#fff", // White text for active button
      },
});