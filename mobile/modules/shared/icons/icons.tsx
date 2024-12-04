import Icon from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

export const iconSize = 30;

interface Params{
    size?:number
}

export const PlusIcon = () => <Icon name="plus" size={iconSize} color="#000" />;
export const StarIcon = ({size}:Params) => (
  <IconFontAwesome name="star" color={"#ecda16"} size={size ?? iconSize} />
);
