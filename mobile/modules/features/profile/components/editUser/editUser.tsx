import { StyleSheet, Text, TextInput, View } from "react-native";
import { ModalComp } from "../../../../core/components/modal";
import useAuthStore from "../../../../core/store/auth";
import { useLanguageStore } from "../../../../core/store/language";
import { useForm } from "../../../../core/hooks/useForm";
import { useMemo } from "react";
import { z } from "zod";
import { handlePut } from "../../../../core/helpers/fetch";
import { handleToast } from "../../../../core/helpers/toast";
import { Btn } from "../../../../core/components/btn";
import { User } from "../../../../core/store/user";

type ParamsType = {
  setVisible: (val: boolean) => void;
  visible: boolean;
};

const useEditUserSchema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      username: z.string().optional(),
      cellphone: z.string().optional(),
      email: z.string().optional(),
      photo: z.number().optional(),
    });
  }, [texts]);
};

export const EditUser = ({ setVisible, visible }: ParamsType) => {
  const { texts, language } = useLanguageStore();
  const { user, updateUsernameAndCellphone } = useAuthStore();
  const editUserSchema = useEditUserSchema();
  const { handleOnSubmit, errors, isPending, Controller, control } = useForm({
    schema: editUserSchema,
    form: async (data) => {
      const { message, status } = await handlePut(
        `auth/edit_profile/${data.email}`,
        data
      );
      if (status === 200 || status === 201) {
        updateUsernameAndCellphone(data.username ?? "", parseInt(data.cellphone ?? ""));
        handleToast(message[language], texts.sucess);
        setVisible(false);
      }
    },
    defaultVales: {
      email: user?.email,
      username: user?.username,
      cellphone: user?.cellphone?.toString(),
    },
  });

  return (
    <ModalComp
      setVisible={setVisible}
      title={texts.profileEditUser}
      visible={visible}
      children={
        <View style={{ gap: 10 }}>
          <View>
            <Controller
              name="cellphone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      errors.cellphone && styles.errorInput,
                    ]}
                    placeholder={texts.profileUsername}
                    placeholderTextColor={"#8b8b8b"}
                    value={value?.toString()}
                    onChangeText={onChange}
                  />
                  {errors.cellphone && (
                    <Text style={styles.errorText}>
                      {errors.cellphone.message}
                    </Text>
                  )}
                </View>
              )}
            />
            {errors.cellphone && (
              <Text style={styles.errorText}>{errors.cellphone.message}</Text>
            )}
          </View>

          <View>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[styles.input, errors.username && styles.errorInput]}
                    placeholder={texts.profileCellphone}
                    placeholderTextColor={"#8b8b8b"}
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.username && (
                    <Text style={styles.errorText}>
                      {errors.username.message}
                    </Text>
                  )}
                </View>
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>

          <Btn
            text={isPending ? texts.loading : texts.profileEditUser}
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
