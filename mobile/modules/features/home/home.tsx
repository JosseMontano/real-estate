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
import { Pagination } from "../../core/components/pagination";
import { Filter } from "../../shared/components/filter";
import { Footer } from "./components/footer";
import { QuestionForm } from "./components/questionForm";
import { useTypeRe } from "./hooks/useTypeRE";
import { useRe } from "../../shared/hooks/useRE";
import { useRedirect } from "./hooks/useRedirect";
import { SkeletonCard } from "./components/card/skeletonCard";

export function HomePage() {
  const { currentType, setCurrentType, typeRE } = useTypeRe();

  const { filteredRealEstates, amountOfPages, currentPage, handlePagination, isLoading } =
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
              {isLoading && [1,2,3,4].map((v)=>(
                <SkeletonCard key={v}/>
              ))}
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
