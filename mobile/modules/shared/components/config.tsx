import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useLanguageStore } from "../../core/store/language";
import { PlusIcon } from "../icons/icons";
import { ModalConfig } from "./modalConfig";

export const Config = () => {
  const { texts, language, setLanguage } = useLanguageStore();
  const [mainModalVisible, setMainModalVisible] = useState(false);

  return (
    <>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setMainModalVisible(true)}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <ModalConfig
        mainModalVisible={mainModalVisible}
        setMainModalVisible={setMainModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
