import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card } from "./components/card";
import { Header } from "./components/header";
import useGet from "../../core/hooks/useGet";
import { RealEstate, TypeRE } from "../../shared/types/realEstate";
import { useNagigation } from "../../core/hooks/useNavigation";
import { Pagination } from "../../core/components/pagination";
import { useRef, useState, useMemo } from "react";
import { Filter } from "./components/filter";
import { Footer } from "./components/footer";
import { QuestionForm } from "./components/questionForm";
import { handleGet } from "../../core/helpers/fetch";
import { useTypeRe } from "./hooks/useTypeRE";
import { useRe } from "./hooks/useRE";
import { useRedirect } from "./hooks/useRedirect";

export function HomePage() {
  const { currentType, setCurrentType, typeRE } = useTypeRe();

  const { filteredRealEstates, amountOfPages, currentPage, handlePagination } =
    useRe({ currentType });

  const {handleScrollToRE, realEstateRef, scrollViewRef, showRealEstate} = useRedirect()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
