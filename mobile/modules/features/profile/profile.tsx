import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

import { BasicInfo } from "./components/basicInfo";
import { SocialMedia } from "./components/socialMedia";
import { useState } from "react";
import { categoryType } from "./types/types";
import { Categories } from "./components/category";

export function ProfilePage() {
  const [activeCategory, setActiveCategory] =
    useState<categoryType>("realEstates");

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <BasicInfo />
        <SocialMedia />
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <View style={styles.containerImg}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11].map((v) => (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimage.png-af37eed9-2fab-4764-8ab8-9e5805ddee34?alt=media&token=cc1d4428-6c90-45d5-8e07-1a0ddf488017",
              }}
              style={styles.image}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 10,
    flexDirection: "column",
    gap: 25,
  },
  containerImg: {
    flexDirection: "row",
    flexWrap: "wrap", 
    marginBottom:80,
  },
  image: {
    width: "33.333%", 
    height:150,
    borderColor: "#212121",
    borderWidth: 0.7,
  },
});
