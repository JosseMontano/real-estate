import Icon from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const iconSize = 30;

interface Params {
  size?: number;
}

export const PlusIcon = () => <Icon name="plus" size={iconSize} color="#000" />;
export const StarIcon = ({ size }: Params) => (
  <IconFontAwesome name="star" color={"#ecda16"} size={size ?? iconSize} />
);
export const SearchIcon = () => (
  <Icon name="search1" size={iconSize} color={"#000"} />
);

export const WhatsappIcon = () => (
  <IconFontAwesome5
    name="whatsapp-square"
    size={iconSize}
    style={{ width: 30, color: "#25d366" }}
  />
);
export const YoutubeIcon = () => (
  <IconFontAwesome5
    name="youtube"
    size={iconSize}
    style={{ width: 40 }}
    color={"#d22721"}
  />
);

export const FacebookIcon = <Icon name="facebook-square" size={25} color="#fff" />;
export const YTIcon = <Icon name="youtube" size={25} color="#fff" />;
export const InstagramIcon = <Icon name="instagram" size={25} color="#fff" />;