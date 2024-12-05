import { StyleSheet, Text, View, Image } from 'react-native';
import { FacebookIcon, WhatsappIcon, YoutubeIcon } from '../../../shared/icons/icons';

type ParamsType = {
}
export const SocialMedia = ({}:ParamsType) => {
    return (
        <View style={styles.networksContainer}> 
        <FacebookIcon />
        <WhatsappIcon />
        <YoutubeIcon />
      </View>
    );
}
const styles = StyleSheet.create({
    networksContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:12,
      }
});