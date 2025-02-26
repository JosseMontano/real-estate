import { StyleSheet, Text, TextInput, View } from "react-native";
import { Btn } from "../../../core/components/btn";
import { useForm } from "../../../core/hooks/useForm";
import { useLanguageStore } from "../../../core/store/language";
import { useMemo } from "react";
import { z } from "zod";
import { primaryColor, secondaryColor } from "../../../core/constants/colors";
import { handlePost } from "../../../core/helpers/fetch";

type ParamsType = {};

export const useQuestionShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      question: z.string().min(3, "Invalid character"),
    });
  }, [texts]);
};

export const QuestionForm = ({}: ParamsType) => {
  const questionSchema = useQuestionShema();
  const { language, texts } = useLanguageStore();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isSignUpPending,
    setSuccessMsg,
    setErrorMsg,
    Controller,
    control,
    reset,
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
      const res = await handlePost("questions", data);
      
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
        setTimeout(() => {
          reset();
        }, 1000);
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <Text style={styles.title}>
          {texts.homeTitleQuestion} <Text style={{ color: secondaryColor }}>{texts.homeTitleBoldQuestion}</Text>
        </Text>
        <Text style={styles.description}>
        {texts.homeDescriptionQuestion}
        </Text>

        <View style={styles.form}>
          <Controller
            name="question"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[styles.input, errors.question && styles.errorInput]}
                  placeholder="Pregunta"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.question && (
                  <Text style={styles.errorText}>
                    {errors.question.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Btn text={texts.save} handleOnSubmit={handleOnSubmit} fullWidth />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 10,
    borderColor: "#dadada",
    borderTopWidth: 1,
    alignItems: "center",
  },
  form: {
    width: 260,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#ececec",
    borderColor: "#ececec",
    borderRadius: 20,
    padding: 13,
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    width: 200,
  },
  description: {
    width: 300,
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
