import { useLinkTo } from "@react-navigation/native";

type Redirect = "MainTabs" | "RealEstate"

export const useNagigation = () => {
  const linkTo = useLinkTo();

  const handleRedirect = (v:Redirect) => {
    linkTo("/"+v);
  };

  return {
    handleRedirect
  };
};
