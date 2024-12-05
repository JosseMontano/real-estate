import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import { Card } from "./components/card";
import { Categories } from "./components/categories";
import { SearchIcon } from "../../shared/icons/icons";
import { Header } from "./components/header";

export function HomePage() {
  const handleSearch = () => {
    Alert.alert("hi");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header handleSearch={handleSearch}/>

        <Text style={styles.title}>Encuentra la propiedad de tus sueños</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.btnContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <Categories key={v}/>
            ))}
          </View>
        </ScrollView>

        <View style={styles.cardContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
            <Card i={i} key={i}/>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#fff",
    padding: 25,
    marginBottom: 70,
  },

  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
  },

  title:{
    fontSize:32,
    fontWeight:"500"
  }
});
