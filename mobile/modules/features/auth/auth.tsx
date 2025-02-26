import { StyleSheet, Text, View, TextInput } from "react-native";
import { z } from "zod";
import { useLanguageStore } from "../../core/store/language";
import { Config } from "../../shared/components/config";
import { useNagigation } from "../../core/hooks/useNavigation";
import useAuthStore from "../../core/store/auth";
import { useForm } from "../../core/hooks/useForm";
import { useEffect, useMemo } from "react";
import GoogleLogin from "./components/googleLogin";
import { Btn } from "../../core/components/btn";
import { handlePost } from "../../core/helpers/fetch";
import { handleToast, handleToastError } from "../../core/helpers/toast";
import { User } from "../../core/store/user";

export const useUserShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      email: z.string().email(texts.invalidEmailAuth),
      password: z.string().min(6, texts.invalidPasswordAuth),
      photo: z.string().optional(),
      code: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined)),
      is_google: z.boolean().optional(),
    });
  }, [texts]);
};

export function AuthPage() {
  const { language, texts } = useLanguageStore();
  const { handleRedirect } = useNagigation();
  const { login, user } = useAuthStore();

  const userSchema = useUserShema();
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
    schema: userSchema,
    form: async (data) => {
      data.photo =
        "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/users%2FdefaultUser.jpg?alt=media&token=e9d3452e-a245-4b1d-a711-ffeba2237443";
      data.is_google = false;
      const { val, message, status } = await handlePost<User>(
        "auth/signup",
        data
      );

      if (status === 200) {
        handleToast(message[language], texts.sucess);
        login({
          email: val.email,
          role: val.role,
          id: val.id,
          available: val.available,
          cellphone: val.cellphone,
          username: val.username,
          photo: val.photo,
          following: val.following,
          favorites: val.favorites,
        });
        handleRedirect("Profile");
      return
      }
      handleToastError(message[language], texts.error);
    },
  });

  useEffect(() => {
    if (user != null) handleRedirect("Home");
  }, [user]);

  return (
    <View
      style={{
        backgroundColor: "#f3f4f6",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{texts.title}</Text>
          <Text style={styles.subTitle}>{texts.subTitle}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[styles.input, errors.email && styles.errorInput]}
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[styles.input, errors.password && styles.errorInput]}
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />
          <View style={styles.btnContainer}>
            <Text style={styles.footerText}>{texts.forgotYourPasswordAuth}</Text>
            <Btn text={texts.title} fullWidth handleOnSubmit={handleOnSubmit} />
          </View>
        </View>

        <Text>{texts.orAuth}</Text>

        <Text>{texts.googleAuth}</Text>
        <View style={{ width: "90%" }}>
          <GoogleLogin />
        </View>
      </View>
      <View style={styles.configContainer}>
        <Config />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 13,
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 11,
    color: "#999999",
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 13,
  },
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
  btnContainer: {
    marginTop: 10,
    display: "flex",
    gap: 13,
  },
  footerText: {
    width: "100%",
    textAlign: "right",
    fontWeight: 400,
  },
  configContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
