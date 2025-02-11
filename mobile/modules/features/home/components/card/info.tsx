import { StyleSheet, Text, View, Image } from 'react-native';
import { StarIcon } from '../../../../shared/icons/icons';
import { RealEstate } from '../../../../shared/types/realEstate';
import { useLanguageStore } from '../../../../core/store/language';
type ParamsType = {
    v: RealEstate
}
export const Info = ({v}:ParamsType) => {
    const {language} = useLanguageStore()
    return (
        <View style={{height:115}}>
        <Text style={styles.title}>{v.title[language]}</Text>
        <Text style={styles.contact}>{v.user.email}</Text>
        <Text style={styles.description}>{v.description[language]}</Text>


        <View style={styles.infoContainer}>
          <Text style={styles.price}>{v.price} BS</Text>
          <View style={styles.ratingContainer}>
            <StarIcon size={15} />
            <Text style={styles.rating}>{v.user.qualification}</Text>
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "left",
      },
      contact: {
        fontSize: 12,
        color: "#888",
        textAlign: "left",
      },
      description: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
      },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      },
      price: {
        fontSize: 16,
        fontWeight: "bold",
      },  ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      },
      rating: {
        fontSize: 14,
      },
});