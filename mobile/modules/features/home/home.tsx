import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Card } from "./components/card";
import { Header } from "./components/header";
import useGet from "../../core/hooks/useGet";
import { fetchRealEstates, fetchTypesRE } from "./api/endpoints";
import { useLanguageStore } from "../../core/store/language";
import { RealEstate } from "../../shared/types/realEstate";
import { useNagigation } from "../../core/hooks/useNavigation";
import { Pagination } from "../../core/components/pagination";

import { useRef, useState } from "react";
import { Filter } from "./components/filter";
import { Footer } from "./components/footer";
import { QuestionForm } from "./components/questionForm";

export function HomePage() {
  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: () => fetchRealEstates(1),
    queryKey: ["realEstates"],
    itemsPerPage: 4,
    valueToService: 1,
  });

  const { data: typeRE } = useGet({
    services: fetchTypesRE,
    queryKey: ["types-real-estates"],
    itemsPerPage: 100,
  });

  const { texts, language } = useLanguageStore();
  const { handleRedirect } = useNagigation();

  const showRealEstate = (v: RealEstate) => {
    handleRedirect("Profile", v.user);
  };

  const [currentType, setCurrentType] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const realEstateRef = useRef<View>(null);

  const handleScrollToRE = () => {
    if (scrollViewRef.current && realEstateRef.current) {
      // Measure the position of the QuestionForm component
      realEstateRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Scroll to the position of the QuestionForm component
        if (scrollViewRef.current)
          scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <Header goRealEstates={handleScrollToRE} />

      <View style={{ padding: 15 }} ref={realEstateRef}>
        <Filter
          currentType={currentType}
          setCurrentType={setCurrentType}
          typeRE={typeRE}
        />

        <View style={styles.cardContainer}>
          {realEstates?.map((v) => (
            <Card key={v.id} v={v} showRealEstate={showRealEstate} />
          ))}
        </View>

        <Pagination
          currentPage={currentPage}
          amountOfPages={amountOfPages}
          handlePagination={handlePagination}
          lastPage={amountOfPages}
        />

        <QuestionForm />
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
});
