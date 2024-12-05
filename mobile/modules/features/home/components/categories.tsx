import { StyleSheet, Text, Pressable } from 'react-native';
import { primaryColor } from '../../../core/constants/colors';
type ParamsType = {
}
export const Categories = ({}:ParamsType) => {
    return (
        <Pressable style={styles.btn}>
        <Text style={styles.btnText}>hi123</Text>
      </Pressable>
    );
}
const styles = StyleSheet.create({
    btn: {
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 12,
      },
      btnText: {
        color: "#fff",
      },
});