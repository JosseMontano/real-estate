import { StyleSheet, Text, TextInput, View } from "react-native";
import { Btn } from "../../../core/components/btn";
import { useForm } from "../../../core/hooks/useForm";
import { useLanguageStore } from "../../../core/store/language";
import { useMemo } from "react";
import { z } from "zod";
import { primaryColor, secondaryColor } from "../../../core/constants/colors";

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
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isSignUpPending,
    setSuccessMsg,
    setErrorMsg,
    Controller,
    control,
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
      console.log(data);
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Haz una <Text style={{ color: secondaryColor }}>pregunta</Text>
      </Text>
      <Text style={styles.description}>
        Tus preguntas se visualizarán en las publicaciones para que los
        propietarios puedan responder de forma automática.
      </Text>

      <View style={styles.form}>
        <Controller
          name="question"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={[styles.input, errors.question && styles.errorInput]}
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
              {errors.question && (
                <Text style={styles.errorText}>{errors.question.message}</Text>
              )}
            </View>
          )}
        />

        <Btn text="Guardar" handleOnSubmit={handleOnSubmit} fullWidth />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  form: {
    width: 300,
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
