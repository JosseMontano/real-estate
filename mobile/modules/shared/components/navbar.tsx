import { StyleSheet, Text, View, Image } from "react-native";
import { Btn } from "../../core/components/btn";
type ParamsType = {
    texts:string
    onClick:()=>void
    backgroundColor:string
};
export const Navbar = ({texts, onClick, backgroundColor}: ParamsType) => {

  const handleGetTextColor=()=>{
    if(backgroundColor=="#fff") return "#000"
    return "#fff"
  }

  return (
    <View style={[styles.headerContainer, {backgroundColor:backgroundColor}]}>
      <Text style={[styles.title, {color:handleGetTextColor()}]}>InmoApp</Text>
      <Btn text={texts} handleOnSubmit={() => onClick()} />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20,
    position: "absolute",
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
  },
});
