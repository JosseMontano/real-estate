import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Redirect = "MainTabs" | "RealEstate" | "Auth" | "Profile" | "CreateRealEstate" | "Home"

type RootStackParamList = {
  MainTabs: undefined;
  RealEstate: undefined;
  Auth: undefined;
  Profile: undefined;
  CreateRealEstate:undefined
  Home:undefined
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export const useNagigation = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleRedirect = (v:Redirect, val?:any) => {
    if(val){
      navigation.navigate(v, val)
      return
    }
    navigation.navigate(v);
  };

  return {
    handleRedirect
  };
};
