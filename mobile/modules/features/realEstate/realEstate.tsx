import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RealEstate } from '../../shared/types/realEstate';
import Carousel from './carousel';
type ParamsType = {
}
export const RealEstatePage = ({}:ParamsType) => {
    const route = useRoute<RouteProp<{ RealEstate: RealEstate }, 'RealEstate'>>();
    const realEstate = route.params;
    return (
        <View style={styles.container}>
            <Carousel realEstate={realEstate}/> 
            <Text>ji1222222222</Text>
            <Text>ji1222222222</Text>
            <Text>ji1222222222</Text>
        </View>
    );
}
const styles = StyleSheet.create({
   container:{
    flex:1,
   }
});