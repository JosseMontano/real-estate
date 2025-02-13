import { StyleSheet, Text, View, Image } from 'react-native';
import { RealEstate } from '../../shared/types/realEstate';
import { RouteProp, useRoute } from '@react-navigation/native';
type ParamsType = {
    
}
export const RealEstatePage = ({}:ParamsType) => {
      const route = useRoute<RouteProp<{ RealEstate: RealEstate }, "RealEstate">>();
      const realEstate = route.params;
    return (
        <View>
            <Text>{realEstate.price}</Text>
        </View>
    );
}
const styles = StyleSheet.create({

});