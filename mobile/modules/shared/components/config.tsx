import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLanguageStore } from "../../core/store/language";
import { PlusIcon } from "../icons/icons";
import { ModalConfig } from "./modalConfig";

export const Config = () => {
  const [mainModalVisible, setMainModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setMainModalVisible(true)}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <ModalConfig
        mainModalVisible={mainModalVisible}
        setMainModalVisible={setMainModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
});
