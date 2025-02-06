import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
type ParamsType = {
    text:string
}
export const Btn = ({text}:ParamsType) => {
    return (
        <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>{text}</Text>
        </Pressable>
      </View>
    );
}
const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 13,
        alignItems: "center",
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