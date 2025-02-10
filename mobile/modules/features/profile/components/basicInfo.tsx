import { StyleSheet, Text, View, Image } from "react-native";
import { User } from "../../../core/store/user";
import { AddressIcon } from "../../../shared/icons/icons";
type ParamsType = {
  user: User;
};
export const BasicInfo = ({ user }: ParamsType) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: user.photo,
        }}
        style={styles.image}
      />
      <View style={styles.containerNames}>
        <Text style={styles.name}>
          <Text>{AddressIcon}</Text>
          <Text> Cochabamba</Text>
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  containerNames: {
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontWeight: 500,
    fontSize: 22,
  },
  email: {
    fontSize: 15,
    color: "#5a5a5a",
  },
});
