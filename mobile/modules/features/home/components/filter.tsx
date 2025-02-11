import { StyleSheet, Text, View, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useLanguageStore } from "../../../core/store/language";
import { TypeRE } from "../../../shared/types/realEstate";

type ParamsType = {
  typeRE: TypeRE[];
  currentType: string;
  setCurrentType: (val: string) => void;
};

export const Filter = ({ typeRE, currentType, setCurrentType }: ParamsType) => {
  const { texts, language } = useLanguageStore();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{texts.typeText}:</Text>
      <Dropdown
        data={typeRE?.map((v) => ({ label: v.name[language], value: v.id })) || []}
        style={styles.dropdown}
        labelField="label"
        valueField="value"
        value={currentType}
        onChange={(val: any) => setCurrentType(val.value)}
        placeholder={texts.selectType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
