import { useRef } from "react";
import { useNagigation } from "../../../core/hooks/useNavigation";
import { RealEstate } from "../../../shared/types/realEstate";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export const useRedirect = () => {
  const { handleRedirect } = useNagigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const realEstateRef = useRef<View>(null);

  const showRealEstate = (v: RealEstate) => {
    handleRedirect("Profile", v.user);
  };

  const handleScrollToRE = () => {
    if (scrollViewRef.current && realEstateRef.current) {
      realEstateRef.current.measure((x, y, width, height, pageX, pageY) => {
        if (scrollViewRef.current)
          scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  return {
    scrollViewRef, realEstateRef, showRealEstate, handleScrollToRE
  };
};
