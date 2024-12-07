import { StyleSheet, Text, Pressable } from 'react-native';
import { primaryColor } from '../../../core/constants/colors';
import { TypeRE } from '../../../shared/types/realEstate';
import { Language } from '../../../core/store/language';
type ParamsType = {
  v:TypeRE
  language: Language
}
export const Categories = ({v, language}:ParamsType) => {
    return (
        <Pressable style={styles.btn}>
        <Text style={styles.btnText}>{v.name[language]}</Text>
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