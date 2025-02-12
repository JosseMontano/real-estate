import { useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import WebView from 'react-native-webview';
import { useLanguageStore } from '../../core/store/language';
import { z } from 'zod';
import { useForm } from '../../core/hooks/useForm';
import { Btn } from '../../core/components/btn';
import useAuthStore from '../../core/store/auth';


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
  const mapUrl = "http://192.168.1.7:5173/select_address";
  const webViewRef = useRef(null);
  const {language, texts} = useLanguageStore()
  const realEstateSchema = useRealEstateShema()
  const [location, setLocation] = useState("");
  const {user} = useAuthStore()
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
      if(user?.id){
        data.latLong=location
        data.userId=user.id.toString() 
        console.log(data);
      }
    }
  });


  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'MAP_CLICK') {
        console.log('Location:', parsedData.location);
        setLocation(parsedData.location)
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const injectedJS = `
    // Wait for the map to be fully loaded before attaching event
    const interval = setInterval(() => {
      if (window.L && window.myMap) {
        clearInterval(interval);
        window.myMap.on('click', function (e) {
          const mapClickEvent = {
            type: 'MAP_CLICK',
            location: { lat: e.latlng.lat, lng: e.latlng.lng }
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(mapClickEvent));
        });
      }
    }, 500);
  `;

  return (

    <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
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
              style={[styles.input, errors.description && styles.errorInput]}
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

      {/* Amount of Bedrooms Field */}
      <Controller
        name="amountBedroom"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.amountBedroom && styles.errorInput]}
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

      {/* Price Field */}
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

      {/* Amount of Bathrooms Field */}
      <Controller
        name="amountBathroom"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.amountBathroom && styles.errorInput]}
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

      {/* Square Meters Field */}
      <Controller
        name="squareMeter"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.squareMeter && styles.errorInput]}
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


      {/* Type Real Estate ID Field */}
      <Controller
        name="typeRealEstateId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.typeRealEstateId && styles.errorInput]}
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


      {/* Submit Button */}
      <Btn
        text="Submit"
        fullWidth
        handleOnSubmit={handleOnSubmit}
      />
    </View>

    <Text>Map Viewer</Text>
      <WebView
        ref={webViewRef}
        source={{ uri: mapUrl }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleWebViewMessage}
      />
  </ScrollView>

  
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
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
  webView: {
    height: 200,
    width: '96%',
  },
});
