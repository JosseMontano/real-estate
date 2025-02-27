import { StyleSheet, Text, View, Image } from 'react-native';
import { useLanguageStore } from '../store/language';
type ParamsType = {
}
export const Empty = ({}:ParamsType) => {
    const {texts} =useLanguageStore()
    return (
        <View style={styles.container}>
            <Image source={require('../../shared/assets/empty.png')} />
            <Text>{texts.empty} </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        width:"100%",
    }
});