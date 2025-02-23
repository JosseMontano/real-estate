import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { ModalComp } from "../../core/components/modal";
import { useLanguageStore } from "../../core/store/language";
import { Question } from "./types/question";
import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "../../core/hooks/useForm";
import { Btn } from "../../core/components/btn";
import useAuthStore from "../../core/store/auth";
import { RealEstate } from "../../shared/types/realEstate";
import { handlePost } from "../../core/helpers/fetch";
import { handleToast } from "../../core/helpers/toast";
import { queryClient } from "../../../App";
import { User } from "../../core/store/user";

type ParamsType = {
  setMainModalVisible: (val: boolean) => void;
  mainModalVisible: boolean;
  question: Question;
  realEstate: Readonly<RealEstate>;
  user: User;
};

export const useAnswerShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      response_text: z.string().min(1, texts.required),
      question_id: z.number().optional(),
      real_estate_id: z.number().optional(),
    });
  }, [texts]);
};

export const AnswerModal = ({
  mainModalVisible,
  setMainModalVisible,
  question,
  realEstate,
  user,
}: ParamsType) => {
  const { texts, language } = useLanguageStore();
  const answerShema = useAnswerShema();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending,
    setSuccessMsg,
    setErrorMsg,
    Controller,
    control,
  } = useForm({
    schema: answerShema,
    form: async (data) => {
      data.question_id = question.id;
      data.real_estate_id = realEstate.id;
      const { message, status } = await handlePost<Question>("responses", data);

      if (status === 200 || status === 201) {
        data.response_text = "";
        handleToast(message[language], texts.sucess);
        setMainModalVisible(false);
        await queryClient.invalidateQueries({
          queryKey: ["questions-unanswered", realEstate.id],
        });
      }
    },
  });

  return (
    <ModalComp
      setVisible={setMainModalVisible}
      title={texts.titleAnswerModal}
      visible={mainModalVisible}
      children={
        <View>
          <Controller
            name="response_text"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    errors.response_text && styles.errorInput,
                  ]}
                  placeholder={texts.placeHolderAnswer}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.response_text && (
                  <Text style={styles.errorText}>
                    {errors.response_text.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Btn
            text={isPending ? texts.loading : texts.titleAnswerModal}
            fullWidth
            handleOnSubmit={handleOnSubmit}
          />
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: "#ececec",
    borderColor: "#ececec",
    borderRadius: 20,
    padding: 13,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 3,
  },
});
