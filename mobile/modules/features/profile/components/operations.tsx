import { StyleSheet, Text, View, Pressable } from "react-native";
import { Btn } from "../../../core/components/btn";
import { AdHouse } from "../../../shared/icons/icons";
import { useNagigation } from "../../../core/hooks/useNavigation";
import { useLanguageStore } from "../../../core/store/language";
type ParamsType = {};

export const Operations = ({}: ParamsType) => {
  const {handleRedirect}= useNagigation()
  const {texts}=useLanguageStore()

  return (
    <View style={styles.container}>
      <View style={[styles.btnContainer]}>
        <Pressable style={styles.btn} onPress={() => handleRedirect("CreateRealEstate")}>
          <Text>{AdHouse}</Text>
          <Text style={styles.btnText} >{texts.profileCreateRE}</Text>
        </Pressable>
      </View>

      <Btn text={texts.profileEditUser} />
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
