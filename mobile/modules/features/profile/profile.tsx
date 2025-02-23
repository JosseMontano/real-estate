import { View, ScrollView, StyleSheet } from "react-native";
import { BasicInfo } from "./components/basicInfo";
import {  useState } from "react";
import { categoryType } from "./types/types";
import { Categories } from "./components/category";
import useAuthStore from "../../core/store/auth";
import { Operations } from "./components/operations";
import useGet, { LanguageDB } from "../../core/hooks/useGet";
import { RealEstate } from "../../shared/types/realEstate";
import { handleGet } from "../../core/helpers/fetch";
import { RealEstateImg } from "./components/realEstate";
import { useNagigation } from "../../core/hooks/useNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { User } from "../../core/store/user";
import { Navbar } from "../../shared/components/navbar";
import { useLanguageStore } from "../../core/store/language";
import { SkeletonRECard } from "./components/skeletonRECard";

export function ProfilePage() {
  const {texts} = useLanguageStore()
  const route = useRoute<RouteProp<{ Profile: User }, "Profile">>();
  const userSelected = route.params;

  const [activeCategory, setActiveCategory] =
    useState<categoryType>("realEstates");
  const { user: userLogged, logout } = useAuthStore();
  const { handleRedirect } = useNagigation();

  const {
    data: posts,
    isLoading,
    firstElementRef,
  } = useGet({
    services: () => {
      if(userSelected){
        return handleGet<RealEstate[]>("real_estates/" + userSelected.id);
      }
      if (!userLogged) {
        return Promise.resolve({
          val: [] as RealEstate[],
          message: {} as LanguageDB,
          status: 500,
        });
      }
      return handleGet<RealEstate[]>("real_estates/" + userLogged.id);
    },
    queryKey: ["realEstates", userLogged?.id], 
    itemsPerPage: 4,
    valueToService: 1,
  });

  if (!userLogged) {
    return null;
  }

  return (
    <ScrollView style={styles.scroll}>

      <Navbar onClick={()=>{logout(); handleRedirect("Auth")}} texts={texts.logOut} backgroundColor="#fff"/>

      <View style={styles.container}>
        <BasicInfo user={userSelected ?? userLogged} />

        <View>
         {userSelected == null &&  <Operations />}

          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isProfile={userSelected !=null}
          />

          <View style={styles.containerImg}>
          {isLoading && [1,2,3,4,5,6].map((v)=> <SkeletonRECard key={v}/>)}
            {posts.map((v) => (
              <RealEstateImg v={v} key={v.id} />
            ))}
          </View>
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
    marginTop: 90,
    flexDirection: "column",
    padding: 25,
  },
  containerImg: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 80,
    columnGap: "2%",
    rowGap: 5,
  },
});
