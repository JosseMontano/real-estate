import React from "react";
import { StyleSheet, View } from "react-native";

export const SkeletonRECard = () => {
  return <View style={[styles.image, styles.skeleton]} />;
};

const styles = StyleSheet.create({
  image: {
    width: "49%",
    height: 150,
    borderColor: "#8c8c8c",
    borderWidth: 0.7,
  },
  skeleton: {
    backgroundColor: "#e1e1e1", 
  },
});