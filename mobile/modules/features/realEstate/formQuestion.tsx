import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useGet from "../../core/hooks/useGet";
import { handleGet } from "../../core/helpers/fetch";
import { Question } from "./types/question";
import { RealEstate } from "../../shared/types/realEstate";
import { useLanguageStore } from "../../core/store/language";
import { Pagination } from "../../core/components/pagination";
import { questionStyles } from "./questions";
type ParamsType = {
  realEstate: Readonly<RealEstate>;
  handleOpenModal: (val: Question) => void;
};
export const FormQuestion = ({ realEstate, handleOpenModal }: ParamsType) => {
  const { language } = useLanguageStore();
  const styles = questionStyles;
  const {
    data: unanswered,
    isLoading: isLoadingUnanswered,
    currentPage,
    amountOfPages,
    handlePagination,
  } = useGet({
    services: () =>
      handleGet<Question[]>("questions/unanswered/" + realEstate.id),
    queryKey: ["questions-unanswered", realEstate.id],
    itemsPerPage: 2,
  });

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        {unanswered.map((v) => (
          <View style={styles.card} key={v.id}>
            <Text style={styles.questionText}>{v.question[language]}</Text>

            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => handleOpenModal(v)}
            >
              <Text style={styles.replyText}>Responder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Pagination
        currentPage={currentPage}
        amountOfPages={amountOfPages}
        handlePagination={handlePagination}
        lastPage={amountOfPages}
      />
    
    </View>
  );
};
