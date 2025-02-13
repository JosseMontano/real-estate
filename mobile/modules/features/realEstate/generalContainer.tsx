import { StyleSheet, Text, View, Image } from 'react-native';
import { RealEstate } from '../../shared/types/realEstate';
import { useLanguageStore } from '../../core/store/language';
type ParamsType = {
    v: Readonly<RealEstate>
}
export const GeneralContainer = ({v}:ParamsType) => {
      const { language } = useLanguageStore();
    return (
        <View style={styles.generalContainer}>
        <Text style={styles.title}>{v.title[language]}</Text>
        <Text style={styles.description}>
          {v.description[language]}
        </Text>
        <View
          style={{ flexDirection: "row", justifyContent: "space-evenly" }}
        >
          <Text>Baños: {v.amount_bathroom}</Text>
          <Text>Cuartos:{v.amount_bedroom}</Text>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    generalContainer: {
        flexDirection: "column",
        width: "90%",
        alignSelf: "center",
        gap: 5,
      },
      title: {
        fontSize: 23,
        fontWeight: "bold",
      },
      description: {
        fontSize: 15,
        color: "#727272",
      },
});