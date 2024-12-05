import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SearchIcon } from "../../../shared/icons/icons";
type ParamsType = {
  handleSearch: () => void;
};
export const Header = ({ handleSearch }: ParamsType) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimage.png-af37eed9-2fab-4764-8ab8-9e5805ddee34?alt=media&token=cc1d4428-6c90-45d5-8e07-1a0ddf488017",
          }}
          style={styles.image}
        />
        <Text>Jose Maria Zambrana</Text>
      </View>
      <Pressable onPress={handleSearch}>
        <SearchIcon />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: 300,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
