import { StyleSheet, Text, TextInput, View } from "react-native";
import { ModalComp } from "../../../core/components/modal";
import { useLanguageStore } from "../../../core/store/language";
import { Controller } from "react-hook-form";
import { useForm } from "../../../core/hooks/useForm";
import { useMemo } from "react";
import { z } from "zod";
import { Btn } from "../../../core/components/btn";
import { handlePost } from "../../../core/helpers/fetch";
import { handleToast } from "../../../core/helpers/toast";

type ParamsType = {
  setMainModalVisible: (val: boolean) => void;
  mainModalVisible: boolean;
};

const useSendCodeShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      email_receiver: z.string().email(texts.invalidEmailAuth),
    });
  }, [texts]);
};

export const SendCode = ({
  mainModalVisible,
  setMainModalVisible,
}: ParamsType) => {
  const { texts, language } = useLanguageStore();
  const sendCodeSchema = useSendCodeShema();
  const {
    handleOnSubmit,
    errors,
    isPending,
    Controller,
    control,
  } = useForm({
    schema: sendCodeSchema,
    form: async (data) => {
      const { message, status } = await handlePost(
        "auth/forgot_password",
        data
      );
      if (status === 200 || status === 201) {
        handleToast(message[language], texts.sucess);
        setMainModalVisible(false);
      }
    },
  });

  return (
    <ModalComp
      setVisible={setMainModalVisible}
      title={texts.recuperateAccount}
      visible={mainModalVisible}
      children={
        <View>
          <Controller
            name="email_receiver"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    errors.email_receiver && styles.errorInput,
                  ]}
                  placeholder={texts.placeHolderAnswer}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email_receiver && (
                  <Text style={styles.errorText}>
                    {errors.email_receiver.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Btn
            text={isPending ? texts.loading : texts.recuperateAccount}
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
