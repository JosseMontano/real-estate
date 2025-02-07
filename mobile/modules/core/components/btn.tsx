import { StyleSheet, Text, View, Image, Pressable } from "react-native";
type ParamsType = {
  text: string;
  handleOnSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  fullWidth?:boolean
};
export const Btn = ({ text, handleOnSubmit, fullWidth=false }: ParamsType) => {
  return (
    <View style={[styles.btnContainer,!fullWidth && { alignItems: "center" }]}>
      <Pressable style={styles.btn} onPress={handleOnSubmit}>
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",

    gap: 13,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: "#6ca704",
    padding: 13,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 600,
  },
});
