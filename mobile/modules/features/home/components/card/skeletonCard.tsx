import React from "react";
import { StyleSheet, View } from "react-native";

export const SkeletonCard = () => {
  return (
    <View style={styles.container}>
      {/* Skeleton for Image */}
      <View style={[styles.image, styles.skeleton]} />

      {/* Skeleton for Header */}
      <View style={[styles.header, styles.skeleton]} />

      {/* Skeleton for Info */}
      <View style={[styles.info, styles.skeleton]} />
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
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  header: {
    width: "100%",
    height: 30,
    borderRadius: 8,
  },
  info: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  skeleton: {
    backgroundColor: "#e1e1e1", // Light gray color for skeleton
  },
});