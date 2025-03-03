import { handleToast } from "../../../core/helpers/toast";
import { queryClient } from "../../../../App";
import { Btn } from "../../../core/components/btn";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useForm } from "../../../core/hooks/useForm";
import { useLanguageStore } from "../../../core/store/language";
import { useMemo, useState } from "react";
import { z } from "zod";
import { RealEstate } from "../../../shared/types/realEstate";
import useAuthStore from "../../../core/store/auth";
import { handlePost } from "../../../core/helpers/fetch";
import { StarIcon } from "../../../shared/icons/icons";
import { ModalComp } from "../../../core/components/modal";

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
  const [raiting, setRaiting] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { language, texts } = useLanguageStore();
  const { handleOnSubmit, errors, isPending, Controller, control } = useForm({
    schema: useFeedbackSchema(),
    form: async (data) => {
      data.real_estate_id = realEstate?.id;
      data.commentator_id = user?.id;
      data.amount_star = raiting;
      const { message, status } = await handlePost("comments", data);

      if (status === 200 || status === 201) {
        handleToast(message[language], texts.sucess);
        await queryClient.invalidateQueries({
          queryKey: ["comments-by-readl-estate", realEstate.id],
        });
      }
    },
  });

  const handleStarPress = (selectedRating: number) => {
    setRaiting(selectedRating);
    setShowModal(false);
  };

  return (
    <View>
      <Controller
        name="comment_text"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.form}>
            <View>
              <Image style={styles.image} source={{ uri: user?.photo }} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.comment_text && styles.errorInput]}
                placeholder={texts.addFeedback}
                value={value}
                onChangeText={onChange}
              />
              <Pressable
                style={styles.starIcon}
                onPress={() => setShowModal(true)}
              >
                <StarIcon size={22} />
              </Pressable>
            </View>
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

      <ModalComp
        setVisible={setShowModal}
        title={texts.amountStarts}
        visible={showModal}
        children={
          <View style={{ marginBottom: 10 }}>
            <View
              style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => handleStarPress(star)}>
                  <StarIcon
                    size={22}
                    bg={star <= raiting ? "#ecda16" : "#ccc"}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center", // Alinea los elementos verticalmente
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Usa un número en lugar de "50%" para borderRadius
  },
  inputContainer: {
    flex: 1, // Ocupa el espacio restante
    position: "relative", // Necesario para posicionar la estrella de manera absoluta
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#ececec",
    borderColor: "#ececec",
    borderRadius: 20,
    padding: 13,
    fontSize: 16,
    width: "100%", // Ocupa todo el ancho del contenedor
    paddingRight: 40, // Espacio para la estrella
  },
  starIcon: {
    position: "absolute", // Posiciona la estrella de manera absoluta
    right: 15, // Ajusta la posición horizontal
    top: "50%", // Centra verticalmente
    transform: [{ translateY: -12 }], // Ajusta la posición vertical (mitad del tamaño del ícono)
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
