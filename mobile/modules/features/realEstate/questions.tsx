import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { User } from "../../core/store/user";
import useGet, { LanguageDB } from "../../core/hooks/useGet";
import { handleGet } from "../../core/helpers/fetch";
import { Question } from "./types/question";
import { AdHouse, FacebookIcon } from "../../shared/icons/icons";
import { Pagination } from "../../core/components/pagination";
import { useLanguageStore } from "../../core/store/language";
import { RealEstate } from "../../shared/types/realEstate";
import useAuthStore from "../../core/store/auth";
import { FormQuestion } from "./formQuestion";
import { QuestionsWithResponse } from "./questionsWithResponse";
import { secondaryColor } from "../../core/constants/colors";

type ParamsType = {
  user: User;
  handleOpenModal: (val: Question) => void;
  realEstate: Readonly<RealEstate>;
};

export const Questions = ({
  user,
  handleOpenModal,
  realEstate,
}: ParamsType) => {
  const { user: userLogged } = useAuthStore();

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {user.id == userLogged?.id && (
          <FormQuestion
            handleOpenModal={handleOpenModal}
            realEstate={realEstate}
          />
        )}

        {/* if is vistor */}
        {user.id != userLogged?.id && (
          <QuestionsWithResponse realEstate={realEstate} />
        )}

        
      </View>
    </View>
  );
};

export const questionStyles = StyleSheet.create({
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
    width:150
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
    color: secondaryColor,
    marginLeft: 4,
  },
});
