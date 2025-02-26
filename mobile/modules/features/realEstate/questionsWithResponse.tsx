import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useGet, { LanguageDB } from "../../core/hooks/useGet";
import { handleGet } from "../../core/helpers/fetch";
import { Question } from "./types/question";
import { RealEstate } from "../../shared/types/realEstate";
import { useLanguageStore } from "../../core/store/language";
import { Pagination } from "../../core/components/pagination";
import { Response } from "../../shared/types/response";
import { questionStyles } from "./questions";
type ParamsType = {
  realEstate: Readonly<RealEstate>;
};

export const QuestionsWithResponse = ({ realEstate }: ParamsType) => {
  const { language } = useLanguageStore();
  const styles= questionStyles
  const {
    data: answered,
    isLoading: isLoadingAnswered,
    currentPage,
    amountOfPages,
    handlePagination,
  } = useGet({
    services: () => handleGet<Response[]>("responses/" + realEstate.id),
    queryKey: ["questions-responses"],
    itemsPerPage:2,
  });

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
      {answered?.map((v) => (
        <View style={styles.card} key={v.id}>
          <Text style={styles.questionText}>
            {v.question.question[language]}
          </Text>

          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyText}>{v.response[language]}</Text>
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
