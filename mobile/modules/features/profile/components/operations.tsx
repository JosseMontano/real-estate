import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Btn } from "../../../core/components/btn";
import { AdHouse } from "../../../shared/icons/icons";
type ParamsType = {};
export const Operations = ({}: ParamsType) => {
  return (
    <View style={styles.container}>
      <View style={[styles.btnContainer]}>
        <Pressable style={styles.btn} onPress={() => {}}>
          <Text>{AdHouse}</Text>
          <Text style={styles.btnText}>{"Crear Inmueble"}</Text>
        </Pressable>
      </View>

      <Btn text="Editar usuario" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
     alignItems:"center",
    gap: 10,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop:10
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "#d4d4d4",
    borderRadius: 20,
    height:42,
    paddingInline:10,
  },
  btnText: {
    color: "#000",
  },
});
