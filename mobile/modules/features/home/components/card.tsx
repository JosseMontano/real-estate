import { StyleSheet, Text, View, Image } from "react-native";
import { StarIcon } from "../../../shared/icons/icons";
type ParamsType = {
  i: number;
};
export const Card = ({ i }: ParamsType) => {
  return (
    <View key={i}>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimage.png-af37eed9-2fab-4764-8ab8-9e5805ddee34?alt=media&token=cc1d4428-6c90-45d5-8e07-1a0ddf488017",
        }}
        style={styles.image}
      />
      <Text>Bonita casa</Text>
      <View style={styles.infoContainer}>
        <Text>$570</Text>
        <Text>|</Text>
        <View style={styles.startContainer}>
          <StarIcon size={15} />
          <Text>4.5</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 180,
    objectFit: "cover",
    borderRadius: 20,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",

    gap: 7,
  },
  startContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    gap:3,
  }
});
