import { StyleSheet, Text, View, Image } from 'react-native';
type ParamsType = {
}
export const BasicInfo = ({}:ParamsType) => {
    return (
        
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimage.png-af37eed9-2fab-4764-8ab8-9e5805ddee34?alt=media&token=cc1d4428-6c90-45d5-8e07-1a0ddf488017",
            }}
            style={styles.image}
          />
          <View style={styles.containerNames}>
            <Text style={styles.name}>Jose Maria Zambrana</Text>
            <Text style={styles.email}>eljosema505@gmail.com</Text>
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