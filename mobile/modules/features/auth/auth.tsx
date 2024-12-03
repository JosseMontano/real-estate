import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLanguageStore } from "../../core/store/language";
import { PlusIcon } from "../../shared/icons/icons";


const userSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export function AuthPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("Form Data:", data);
  };

  const { texts } = useLanguageStore();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[
            styles.centeredView,
            modalVisible && { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <Image
          style={styles.image}
          source={require("../../shared/assets/realEstate.png")}
        />
      </View>

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
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>I'm pressable!</Text>
          </Pressable>
          <Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
        </View>
      </View>

      <View style={styles.lenguageContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <PlusIcon />
        </Pressable>{" "}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  lenguageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, //shadow androd
    padding: 3,
  },
  container: {
    flex: 1,
    gap: 13,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
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
    flexDirection: "column",
    gap: 13,
    alignItems: "center",
  },
  btn: {
    borderRadius: 20,
    backgroundColor: "#6ca704",
    padding: 13,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 600,
  },
  footerText: {
    textAlign: "center",
    color: "#6ca704",
    fontWeight: 400,
  },
});
