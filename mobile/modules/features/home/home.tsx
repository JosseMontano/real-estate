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

import { useState } from "react";
import { Filter } from "./components/filter";

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

  const handleSearch = () => {
    Alert.alert("hi");
  };

  const showRealEstate = (v: RealEstate) => {
    handleRedirect("RealEstate");
  };

  const [currentType, setCurrentType] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Header />

   <View style={{padding:15}}>
    <Filter currentType={currentType} setCurrentType={setCurrentType} typeRE={typeRE}/>

      <View style={styles.cardContainer}>
        {realEstates?.map((v) => (
          <Card
            key={v.id}
            v={v}
            showRealEstate={showRealEstate}
          />
        ))}
      </View>

      <Pagination
        currentPage={currentPage}
        amountOfPages={amountOfPages}
        handlePagination={handlePagination}
        lastPage={amountOfPages}
      />
   </View>
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
