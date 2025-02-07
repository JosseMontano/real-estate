import { useLinkTo } from "@react-navigation/native";

type Redirect = "MainTabs" | "RealEstate" | "Auth"

export const useNagigation = () => {
  const linkTo = useLinkTo();

  const handleRedirect = (v:Redirect) => {
    linkTo("/"+v);
  };

  return {
    handleRedirect
  };
};
