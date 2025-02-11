import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { Card } from "./components/card";
import { Header } from "./components/header";
import useGet from "../../core/hooks/useGet";
import { useLanguageStore } from "../../core/store/language";
import { RealEstate, TypeRE } from "../../shared/types/realEstate";
import { useNagigation } from "../../core/hooks/useNavigation";
import { Pagination } from "../../core/components/pagination";
import { useRef, useState, useEffect, useMemo } from "react"; // Add useMemo
import { Filter } from "./components/filter";
import { Footer } from "./components/footer";
import { QuestionForm } from "./components/questionForm";
import { handleGet } from "../../core/helpers/fetch";

export function HomePage() {
  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: () => handleGet<RealEstate[]>('real_estates/all_re/' + 1),
    queryKey: ["realEstates"],
    itemsPerPage: 4,
    valueToService: 1,
  });

  const { data: typeRE } = useGet({
    services: () => handleGet<TypeRE[]>('type-real-estates'),
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
      realEstateRef.current.measure((x, y, width, height, pageX, pageY) => {
        if (scrollViewRef.current)
          scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  // Use useMemo to filter real estates
  const filteredRealEstates = useMemo(() => {
    if (currentType) {

      return realEstates?.filter(
        (realEstate) => realEstate.type_real_estate.id === parseInt(currentType)
      ) || [];
    } else {
      // If no type is selected, show all real estates
      return realEstates || [];
    }
  }, [currentType, realEstates]); // Re-run only when currentType or realEstates changes

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <Header goRealEstates={handleScrollToRE} />

      <View style={{ padding: 15 }} ref={realEstateRef}>
        <Filter
          currentType={currentType}
          setCurrentType={setCurrentType}
          data={typeRE}
        />

        <View style={styles.cardContainer}>
          {filteredRealEstates?.map((v) => (
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