import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { useLanguageStore } from "../../core/store/language";
import { z } from "zod";
import { useForm } from "../../core/hooks/useForm";
import { Btn } from "../../core/components/btn";
import useAuthStore from "../../core/store/auth";
import UploadFilesWebView from "./uploadFiles";
import { urls } from "../../core/constants/endpoint";
import { SelectLocation } from "./selectLocation";

export const useRealEstateShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      title: z
        .string()
        .min(1, { message: texts.required })
        .max(100, { message: texts.limit }),
      description: z
        .string()
        .min(1, { message: texts.required })
        .max(500, { message: texts.limit }),
      amountBedroom: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 0, {
          message: texts.noNegative,
        }),
      price: z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
          message: texts.noNegative,
        }),
      amountBathroom: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 0, {
          message: texts.noNegative,
        }),
      squareMeter: z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
          message: texts.noNegative,
        }),
      latLong: z.string().optional().or(z.literal("")),
      typeRealEstateId: z.string().optional().or(z.literal("")),
      userId: z.string().optional().optional().or(z.literal("")),
      images: z.array(z.string()).optional().or(z.array(z.string()).length(0)),
    });
  }, [texts]);
};

export const CreateRE = () => {
  const { language, texts } = useLanguageStore();
  const realEstateSchema = useRealEstateShema();
  const [location, setLocation] = useState("");
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isFormPending,
    setSuccessMsg,
    setErrorMsg,
    Controller,
    control,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user?.id) {
        data.latLong = location;
        data.userId = user.id.toString();
        console.log(data);
      }
    },
  });

  return (
    <>
      <Modal transparent visible={isLoading}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0a0a0a" />
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{texts.profileCreateRE}</Text>
        <View style={styles.formContainer}>
          {/* Title Field */}
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[styles.input, errors.title && styles.errorInput]}
                  placeholder="Title"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.title && (
                  <Text style={styles.errorText}>{errors.title.message}</Text>
                )}
              </View>
            )}
          />

          {/* Description Field */}
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    errors.description && styles.errorInput,
                  ]}
                  placeholder="Description"
                  value={value}
                  onChangeText={onChange}
                  multiline
                />
                {errors.description && (
                  <Text style={styles.errorText}>
                    {errors.description.message}
                  </Text>
                )}
              </View>
            )}
          />
          <View style={{ flexDirection: "row", gap: 3, maxWidth: 165 }}>
            <Controller
              name="amountBedroom"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      errors.amountBedroom && styles.errorInput,
                    ]}
                    placeholder="Amount of Bedrooms"
                    value={value?.toString()}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                  {errors.amountBedroom && (
                    <Text style={styles.errorText}>
                      {errors.amountBedroom.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="amountBathroom"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      errors.amountBathroom && styles.errorInput,
                    ]}
                    placeholder="Amount of Bathrooms"
                    value={value?.toString()}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                  {errors.amountBathroom && (
                    <Text style={styles.errorText}>
                      {errors.amountBathroom.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 3}}>
            <Controller
              name="squareMeter"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      errors.squareMeter && styles.errorInput,
                    ]}
                    placeholder="Square Meters"
                    value={value?.toString()}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                  {errors.squareMeter && (
                    <Text style={styles.errorText}>
                      {errors.squareMeter.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    style={[styles.input, errors.price && styles.errorInput]}
                    placeholder="Price"
                    value={value?.toString()}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                  {errors.price && (
                    <Text style={styles.errorText}>{errors.price.message}</Text>
                  )}
                </View>
              )}
            />
          </View>
          {/* Type Real Estate ID Field */}
          <Controller
            name="typeRealEstateId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    errors.typeRealEstateId && styles.errorInput,
                  ]}
                  placeholder="Type Real Estate ID"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.typeRealEstateId && (
                  <Text style={styles.errorText}>
                    {errors.typeRealEstateId.message}
                  </Text>
                )}
              </View>
            )}
          />

          <SelectLocation
            setIsLoading={setIsLoading}
            setLocation={setLocation}
          />
          <UploadFilesWebView />

          <Btn text="Submit" fullWidth handleOnSubmit={handleOnSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    padding: 10,
  },
  title: {
    fontSize: 22,
  },
  formContainer: {
    borderRadius: 15,
    padding: 20,
    gap: 15,
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
});
