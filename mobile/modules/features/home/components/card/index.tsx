import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Image, Pressable, Button, Text } from "react-native";
import { RealEstate } from "../../../../shared/types/realEstate";
import WebView from "react-native-webview";
import { urls } from "../../../../core/constants/endpoint";
import { Info } from "./info";
import { HeaderCard } from "./headerCard";
import { HeartIcon, HeartOutLinedIcon } from "../../../../shared/icons/icons";
import { useLanguageStore } from "../../../../core/store/language";
import { z } from "zod";
import { useForm } from "../../../../core/hooks/useForm";
import useAuthStore, { Favorites } from "../../../../core/store/auth";
import { handleDelete, handlePost } from "../../../../core/helpers/fetch";
import { handleToast } from "../../../../core/helpers/toast";
import { useMutation } from "@tanstack/react-query";

type ParamsType = {
  v: RealEstate;
  showRealEstate: (v: RealEstate) => void;
};

export const useFavsShema = () => {
  const { texts } = useLanguageStore();
  return useMemo(() => {
    return z.object({
      real_estate_id: z.number().optional(),
      user_id: z.number().optional(),
    });
  }, [texts]);
};

export const Card = ({ v, showRealEstate }: ParamsType) => {
  const { language, texts } = useLanguageStore();
  const [activeButton, setActiveButton] = useState<"info" | "places">("info");
  const { user, addFavorite,removeFavorite } = useAuthStore();
  const webViewRef = useRef(null);

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "FILTER_CHANGE") {
        const filterKey = parsedData.filterKey;
        console.log("Filtrando por:", filterKey);
        // Aquí puedes manejar el filtrado en React Native si es necesario
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

 // const mapUrl = urls.web + "map/" + v.lat_long+"/"+language;
  const mapUrl ="http://192.168.1.8:5173/#/"+ "map/" + v.lat_long+"/"+language;
  const useFavsSchema = useFavsShema();

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
    schema: useFavsSchema,
    form: async (data) => {
      data.real_estate_id = v.id;
      data.user_id = user?.id;
      const { message, status, val } = await handlePost<Favorites>(
        "favorite_real_estates",
        data
      );

      if (status === 200 || status === 201) {
        handleToast(message[language], texts.sucess);
        addFavorite(val);
        /*          await queryClient.invalidateQueries({
            queryKey: ["questions-unanswered", realEstate.id],
          }); */
      }
    },
  });


  const { mutate: deleteFav } = useMutation({
    mutationFn: ()=> handleDelete("favorite_real_estates", v.id + "/"+user?.id),
    onSuccess: () => {
      removeFavorite(v.id ?? 0);
    },
  });

  const isFavoriteRef = useRef(false);

  useEffect(() => {
    const isFavorite = user?.favorites?.some(
      (favorite) => favorite.id === v.id
    );
    isFavoriteRef.current = isFavorite ?? false;

    // If you need to force a re-render, you can use a state toggle
    // forceUpdate((prev) => !prev); // Uncomment if re-render is needed
  }, [user?.favorites, v.id]);

  return (
    <View style={styles.container} key={v.id}>
      {/* Wrap Image and Icon in a View */}
      <View style={styles.imageContainer}>
        <Pressable onPress={() => showRealEstate(v)}>
          <Image
            source={{
              uri: v.photos[0].image,
            }}
            style={styles.image}
          />
        </Pressable>

        <Pressable onPress={isFavoriteRef.current ? ()=>deleteFav() : ()=>handleOnSubmit() } style={styles.heartIcon}>
          <Text>{isFavoriteRef.current ? HeartIcon : HeartOutLinedIcon}</Text>
        </Pressable>
      </View>

      <HeaderCard
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />

      {activeButton == "info" && <Info v={v} />}

      {activeButton == "places" && (
        <WebView
          source={{ uri: mapUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          ref={webViewRef}
          onMessage={handleWebViewMessage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative", // Needed for absolute positioning of the icon
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  heartIcon: {
    position: "absolute", // Position the icon absolutely
    top: 10, // Adjust top spacing
    right: 10, // Adjust right spacing
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Add a background for better visibility
    borderRadius: 20, // Optional: Round the background
    padding: 5, // Optional: Add padding around the icon
  },
  webView: {
    height: 115,
    width: "96%",
  },
});
