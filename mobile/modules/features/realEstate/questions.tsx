import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { User } from "../../core/store/user";
import useGet from "../../core/hooks/useGet";
import { handleGet } from "../../core/helpers/fetch";
import { Question } from "./types/question";
import { AdHouse, FacebookIcon } from "../../shared/icons/icons";
import { Pagination } from "../../core/components/pagination";
import { useLanguageStore } from "../../core/store/language";

type ParamsType = {
  user: User;
};
export const Questions = ({ user }: ParamsType) => {
  const { language } = useLanguageStore();
  const {
    data: unanswered,
    isLoading: isLoadingUnanswered,
    currentPage,
    amountOfPages,
    handlePagination,
  } = useGet({
    services: () => handleGet<Question[]>("questions/unanswered/" + user.id),
    queryKey: ["realEstates"],
    itemsPerPage: 2,
  });

  const { data: answered, isLoading: isLoadingAnswered } = useGet({
    services: () => handleGet<Question[]>("responses" + user.id),
    queryKey: ["realEstates"],
  });

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {unanswered.map((v) => (
          <View style={styles.card} key={v.id}>
            <Text style={styles.questionText}>{v.question[language]}</Text>

            <TouchableOpacity style={styles.replyButton} onPress={() => {}}>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "40%",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  replyText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
  },
});
