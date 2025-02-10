import { View, ScrollView, StyleSheet, Image } from "react-native";
import { BasicInfo } from "./components/basicInfo";
import { useState } from "react";
import { categoryType } from "./types/types";
import { Categories } from "./components/category";
import useAuthStore from "../../core/store/auth";
import { Operations } from "./components/operations";
import useGet from "../../core/hooks/useGet";
import { RealEstate } from "../../shared/types/realEstate";
import { handleGet } from "../../core/helpers/fetch";
import { RealEstateImg } from "./components/realEstate";

export function ProfilePage() {
  const [activeCategory, setActiveCategory] =
    useState<categoryType>("realEstates");
  const { user: userLogged } = useAuthStore();

  const {
    data: posts,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: () => handleGet<RealEstate[]>("real_estates/" + userLogged.id),
    queryKey: ["realEstates"],
    itemsPerPage: 4,
    valueToService: 1,
  });
  console.log(posts);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <BasicInfo user={userLogged} />
        
        <View>
          <Operations />

          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <View style={styles.containerImg}>
            {posts.map((v) => (
              <RealEstateImg v={v} />
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
