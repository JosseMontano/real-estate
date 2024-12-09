import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export const getParamsStr = (params: Record<string, string | undefined>) => {
  const arr = [];
  for (const key in params) {
    if (params[key]) {
      arr.push(`${key}=${params[key]}`);
    }
  }
  return "?" + arr.join("&");
};

const GoogleLogin = () => {
  const appUrl = Linking.createURL("");

  const getUserData = (params: Linking.EventType | Linking.QueryParams | null) => {
    const parsedParams = params as Record<string, string> | null;
    //? here you get the params send from the backend endpoint, you can have a query getting the user from an endpoint with the id or something like that.
    const { id, name } = parsedParams ?? {};
    console.log({ id, name });
  }

  const handlePress = async () => {
    const REDIRECT_URI = process.env.EXPO_PUBLIC_BACKEND + "google";
    const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID; 

    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope:
        "https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile",
      access_type: "offline",
      prompt: "consent",
      state: appUrl,
    };
    const webUrl = baseUrl + getParamsStr(params);
    const result = await WebBrowser.openAuthSessionAsync(webUrl, REDIRECT_URI);
    const { url } = result as { url: string | undefined };
    if (url) {
      const params = Linking.parse(url);
      getUserData(params.queryParams);
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", getUserData);
  }, []);

  return (
    <Pressable onPress={handlePress}>
      <Text>Logueate con google haciendo click aquí</Text>
    </Pressable>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({});
