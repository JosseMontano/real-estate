import { View, ScrollView, StyleSheet, Image } from "react-native";
import { BasicInfo } from "./components/basicInfo";
import { useEffect, useState } from "react";
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


export function ProfilePage() {

  const route = useRoute<RouteProp<{ Profile: User }, "Profile">>();
  const userSelected = route.params;

  const [activeCategory, setActiveCategory] =
    useState<categoryType>("realEstates");
  const { user: userLogged } = useAuthStore();
  const { handleRedirect } = useNagigation();

  const {
    data: posts,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
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

  useEffect(() => {
    if (!userLogged) {
      handleRedirect("Auth");
    }
  }, [userLogged, handleRedirect, userSelected]);

  if (!userLogged) {
    return null;
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <BasicInfo user={userSelected ?? userLogged} />

        <View>
          <Operations />

          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <View style={styles.containerImg}>
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
    marginTop: 10,
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
