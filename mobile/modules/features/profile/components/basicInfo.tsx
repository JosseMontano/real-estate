import { StyleSheet, Text, View, Image } from 'react-native';
import { User } from '../../../core/store/user';
type ParamsType = {
  user: User
}
export const BasicInfo = ({user}:ParamsType) => {
    return (
        
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: user.photo,
            }}
            style={styles.image}
          />
          <View style={styles.containerNames}>
            <Text style={styles.name}>Jose Maria Zambrana</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      containerNames:{
        flexDirection:"column",
       alignItems:"center"
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