import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLanguageStore } from "../../core/store/language";
import { PlusIcon } from "../icons/icons";
import { Dropdown } from "react-native-element-dropdown";
import { ModalComp } from "../../core/components/modal";

export const Config = () => {
  const { texts, language, setLanguage } = useLanguageStore();
  const [mainModalVisible, setMainModalVisible] = useState(false);

  const data = [
    { label: texts.spanishConfig, value: "es" },
    { label: texts.englishConfig, value: "en" },
    { label: texts.portugueseConfig, value: "pt" },
  ];

  return (
    <>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setMainModalVisible(true)}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <ModalComp
        setVisible={setMainModalVisible}
        title={texts.titleModalConfig}
        visible={mainModalVisible}
        children={
          <View>
            <Text>{texts.titleConfig}:</Text>
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              value={language}
              onChange={(val:any)=>setLanguage(val.value)}
            />
          </View>
        }
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
