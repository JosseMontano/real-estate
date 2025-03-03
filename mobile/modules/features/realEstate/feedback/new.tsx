import { handleToast } from "../../../core/helpers/toast";
import { queryClient } from "../../../../App";
import { Btn } from "../../../core/components/btn";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useForm } from "../../../core/hooks/useForm";
import { useLanguageStore } from "../../../core/store/language";
import { useMemo } from "react";
import { z } from "zod";
import { RealEstate } from "../../../shared/types/realEstate";
import useAuthStore from "../../../core/store/auth";
import { handlePost } from "../../../core/helpers/fetch";

export const useFeedbackSchema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      comment_text: z.string().min(1, texts.required),
      amount_star: z.number().optional(),
      real_estate_id: z.number().optional(),
      commentator_id: z.number().optional(),
    });
  }, [texts]);
};

type ParamsType = { realEstate: Readonly<RealEstate> };

export const New = ({ realEstate }: ParamsType) => {
  const { user } = useAuthStore();
  const { language, texts } = useLanguageStore();
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
    schema: useFeedbackSchema(),
    form: async (data) => {
      data.real_estate_id = realEstate?.id;
      data.commentator_id = user?.id;
      data.amount_star = 3;
      const { message, status } = await handlePost("comments", data);

      if (status === 200 || status === 201) {
        handleToast(message[language], texts.sucess);
        await queryClient.invalidateQueries({
          queryKey: ["comments-by-readl-estate", realEstate.id],
        });
      }
    },
  });

  return (
    <View >
      <Controller
        name="comment_text"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.form}>
            <View>
              <Image style={styles.image} source={{ uri: user?.photo }} />
            </View>
            <TextInput
              style={[styles.input, errors.comment_text && styles.errorInput]}
              placeholder={texts.addFeedback}
              value={value}
              onChangeText={onChange}
            />
            {errors.comment_text && (
              <Text style={styles.errorText}>
                {errors.comment_text.message}
              </Text>
            )}
          </View>
        )}
      />
      <Btn
        text={isPending ? texts.loading : texts.save}
        fullWidth
        handleOnSubmit={handleOnSubmit}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    form:{
        flexDirection:"row",
        gap:10,
    },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#ececec",
    borderColor: "#ececec",
    borderRadius: 20,
    padding: 13,
    fontSize: 16,
    width:"80%"
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
