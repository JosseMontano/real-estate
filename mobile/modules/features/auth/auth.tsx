import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { z } from "zod";

import { useLanguageStore } from "../../core/store/language";
import { Config } from "../../shared/components/config";
import { useNagigation } from "../../core/hooks/useNavigation";
import useAuthStore from "../../core/store/auth";
import { useForm } from "../../core/hooks/useForm";
import { useMemo } from "react";
import GoogleLogin from "./components/googleLogin";
import { Btn } from "../../core/components/btn";

export const useUserShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
  }, [texts]);
};

export function AuthPage() {
  const { handleRedirect } = useNagigation();
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
      console.log(data);
    },
  });
  const { login } = useAuthStore();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("Form Data:", data);
  };

  const { texts } = useLanguageStore();

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
            <Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
            <Btn text="Sign in" fullWidth handleOnSubmit={onSubmit} />
          </View>
        </View>

        <Text>O</Text>

        <Text>Inicia con Google</Text>
        <View style={{width:"90%"}}>
        <GoogleLogin />
        </View>
   
     
      </View>
      <Config />
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
    borderRadius:15,
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
});
