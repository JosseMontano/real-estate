import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Redirect = "MainTabs" | "RealEstate" | "Auth" | "Profile"

type RootStackParamList = {
  MainTabs: undefined;
  RealEstate: undefined;
  Auth: undefined;
  Profile: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export const useNagigation = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleRedirect = (v:Redirect) => {
    navigation.navigate(v);
  };

  return {
    handleRedirect
  };
};
